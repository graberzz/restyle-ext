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

    getStylesheet(callback, url) {
        chrome.storage.sync.get(['styles'], styles => {            
            if (url && styles[url]) {
                callback(null, styles[url]);
            } else {
                callback(styles);
            }
        });
    },

    accumulateStyles(stylesheet) {
        this._accumulatedStyles.children = deepMerge(this._accumulatedStyles.children, stylesheet)
    },

    saveAccumulatedStyles(url) {
        this.getStylesheet(oldStyles => {
            const styles = Object.assign({}, oldStyles, deepMerge(oldStyles[url], this._accumulateStyles));
            chrome.storage.sync.set({styles}, () => {
                // reset acc
            });
        });
    }
};

export default storageManager;