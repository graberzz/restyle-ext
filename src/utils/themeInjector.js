import { toCSS } from './CSSJSON';
import { Themes } from './storage';

const ThemeInjector = {
  injected: [],

  inject(theme) {
    const style = document.createElement('style');
    style.textContent = toCSS(theme.styles);
    this.injected.push({ theme, style });
    document.head.appendChild(style);
  },

  eject(ejectTheme) {
    const index = this.injected.findIndex(({ theme }) => theme === ejectTheme);

    if (index === -1) throw new Error('Theme not found');

    document.head.removeChild(this.injected[index].style);
    this.injected.splice(index, 1);
  },

  injectSuitable() {
    Themes.get()
      .then((themes) => {
        const suitableThemes = themes.filter(theme =>
          theme.domains.includes(window.location.hostname));

        suitableThemes.forEach(theme => this.inject(theme));
      });
  },
};

export default ThemeInjector;
