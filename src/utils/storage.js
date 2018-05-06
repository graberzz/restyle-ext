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

  },

  edit: (theme) => {

  },

  delete: (id) => {

  },
};

export {
  Themes,
};