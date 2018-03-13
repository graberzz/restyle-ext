const storageManager = {
    save(url, data) {
        const stylesheet = {
            url,
            stylesheet: data
        };

        chrome.storage.get(['styles'], styles => {
            chrome.storage.set({styles: [...styles, stylesheet]});
        });

    },

    get(url, callback) {
        chrome.storage.get(['styles'], styles => {
            const stylesheet = styles.find(style => style.url === url);
            
            if (stylesheet) {
                callback(null, stylesheet);
            } else {
                callback('Stylesheet not found');
            }
        });
    }
};

export default storageManager;