/* global chrome */

const themes = [
  {
    id: 0,
    name: 'Dark theme',
    author: 'author',
    preview: 'https://www.sbs.com.au/popasia/sites/sbs.com.au.popasia/files/styles/full/public/end-of-evangelion.jpg',
    enabled: true,
    domains: [
      'vk.com',
      'vkontakte.ru',
    ],
    styles: {
      body: {
        background: '#000',
      },
    },
  },
  {
    id: 1,
    name: 'Blue theme',
    author: 'author',
    preview: 'https://www.sbs.com.au/popasia/sites/sbs.com.au.popasia/files/styles/full/public/end-of-evangelion.jpg',
    enabled: false,
    domains: [
      'google.com',
      'google.ru',
    ],
    styles: {
      body: {
        background: '#0f0',
      },
    },
  },
];

const Themes = {
  get: (id = -1) => {
    if (id === -1) {
      return Promise.resolve(themes);
    }

    return Promise.resolve(themes.find(theme => theme.id === id));
  },

  add: (theme) => {
    themes.push(theme);

    return Promise.resolve();
  },

  edit: (theme) => {
    const themeIndex = themes.findIndex(({ id }) => id === theme.id);
    if (themeIndex === -1) throw new Error('Theme with specified id not found');

    themes[themeIndex] = {
      ...themes[themeIndex],
      ...theme,
    };

    console.log(themes);

    return Promise.resolve();
  },

  delete: (id) => {
    const themeIndex = themes.findIndex(theme => theme.id === id);
    if (themeIndex === -1) throw new Error('Theme with specified id not found');

    themes.splice(themeIndex, 1);

    return Promise.resolve();
  },
};

export {
  Themes,
};