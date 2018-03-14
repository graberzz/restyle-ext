const storageManager = {
    save({url, stylesheet, callback}) {
        chrome.storage.get(['styles'], styles => {
            styles[url] = stylesheet;
            chrome.storage.set({styles}, callback);
        });

    },

    get(url, callback) {
        chrome.storage.get(['styles'], styles => {            
            if (styles[url]) {
                callback(null, stylesheet);
            } else {
                callback('Stylesheet not found');
            }
        });
    }
};

export default storageManager;