import deepMerge from 'deepmerge';

const storageManager = {
    _accumulatedStyles: {
        attributes: {},
        children: {},
    },

    saveStylesheet(url, stylesheet, callback) {
        chrome.storage.sync.get(['styles'], styles => {
            styles[url] = stylesheet;
            chrome.storage.sync.set({styles}, callback);
        });

    },

    getStylesheet(callback) {
        chrome.storage.sync.get(['styles'], styles => {            
            callback(styles);
        });
    },

    accumulateStyles(stylesheet) {
        console.clear();
        console.log('ACC: ', this._accumulatedStyles);
        console.log('STYLE: ', stylesheet);
        const merged = deepMerge(this._accumulatedStyles.children, stylesheet);
        console.log('MERGED: ', merged);
        this._accumulatedStyles.children = merged;
    },

    clear(url) {
        if (!url) {
            chrome.storage.sync.set({styles: {}});
        } else {
            this.getStylesheet(styles => {
                styles[url] = {};
                chrome.storage.sync.set({styles});
            })
        }
    },

    saveAccumulatedStyles(url) {
        this.getStylesheet(oldStyles => {
            if (!oldStyles) {
                oldStyles = {};
            }
            if (!oldStyles[url]) {
                oldStyles[url] = {};
            }
            const newStyles = deepMerge(oldStyles[url], this._accumulatedStyles);
            oldStyles[url] = newStyles;
            const styles = Object.assign({}, oldStyles, newStyles);
            chrome.storage.sync.set({styles: oldStyles}, () => {
                // reset acc
            });
        });
    }
};

export default storageManager;