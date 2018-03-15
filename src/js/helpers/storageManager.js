const storageManager = {
    saveStylesheet(url, stylesheet, callback) {
        chrome.storage.sync.set(['styles'], styles => {
            styles[url] = stylesheet;
            chrome.storage.set({styles}, callback);
        });

    },

    getStylesheet(url, callback) {
        chrome.storage.sync.get(['styles'], styles => {            
            if (styles[url]) {
                callback(null, stylesheet);
            } else {
                callback('Stylesheet not found');
            }
        });
    }
};

export default storageManager;