const storageManager = {
    saveStylesheet(url, stylesheet, callback) {
        chrome.storage.sync.set(['styles'], styles => {
            styles[url] = stylesheet;
            chrome.storage.set({styles}, callback);
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


};

export default storageManager;