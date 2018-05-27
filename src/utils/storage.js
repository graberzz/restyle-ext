/* global chrome */

const Themes = {
  get: (id = -1) => new Promise((res) => {
    chrome.storage.sync.get(['themes'], (themes) => {
      if (id === -1) {
        res(themes.themes || []); // ???
      } else {
        res(themes.themes.find(theme => theme.id === id));
      }
    });
  }),

  add: theme => new Promise((res) => {
    Themes.get()
      .then((themes = []) => {
        chrome.storage.sync.set({
          themes: [...themes, { ...theme, id: themes.length || 0 }],
        }, () => res(themes));
      });
  }),

  edit: theme => new Promise(res =>
    Themes.get()
      .then((themes) => {
        const themeIndex = themes.findIndex(({ id }) => id === theme.id);

        if (themeIndex === -1) throw new Error('Theme with specified id not found');

        themes[themeIndex] = {
          ...themes[themeIndex],
          ...theme,
        };

        chrome.storage.sync.set({ themes }, () => res(themes));
      })),

  delete: id => new Promise(res =>
    Themes.get()
      .then((themes) => {
        const themeIndex = themes.findIndex(theme => theme.id === id);

        if (themeIndex === -1) throw new Error('Theme with specified id not found');

        themes.splice(themeIndex, 1);
        chrome.storage.sync.set({ themes }, () => res(themes));
      })),
};

export {
  Themes,
};
