import deepMerge from 'deepmerge';
import CSSJSON from '../lib/cssjson';

const storageManager = {
    _accumulatedStyles: {
        attributes: {},
        children: {},
    },

    saveStylesheet(url, stylesheet, callback) {
        chrome.storage.sync.get(['styles'], styles => {
            styles.styles[url] = stylesheet;
            chrome.storage.sync.set({styles: styles.styles}, callback);
        });

    },

    saveStyles(styles) {
        chrome.storage.sync.get(['styles'], oldStyles => {
            oldStyles.styles = styles;
            chrome.storage.sync.set({styles: oldStyles.styles});
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
                oldStyles = {styles: {}};
            }
            if (!oldStyles.styles[url]) {
                oldStyles.styles[url] = {};
            }
            const newStyles = deepMerge(oldStyles.styles[url], this._accumulatedStyles);
            oldStyles.styles[url] = newStyles;
            chrome.storage.sync.set({styles: oldStyles.styles}, () => {
                // reset acc
            });
        });
    },
};

export default storageManager;