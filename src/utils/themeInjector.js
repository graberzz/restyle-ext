import { toCSS } from './CSSJSON';
import { Themes } from './storage';

const ThemeInjector = {
  injected: [],

  inject(theme) {
    const style = document.createElement('style');
    style.textContent = toCSS(theme.styles);
    this.injected.push({ theme, style });
    document.head.appendChild(style);

    return this.injected.length - 1;
  },

  eject(ejectTheme) {
    const index = typeof ejectTheme === 'number' ? ejectTheme : this.injected.findIndex(({ theme }) => theme === ejectTheme);

    if (index === -1) return;

    document.head.removeChild(this.injected[index].style);
    this.injected.splice(index, 1);
  },

  injectSuitable() {
    Themes.get()
      .then((themes) => {
        if (!themes) return;
        if (!Array.isArray(themes)) return;

        const suitableThemes = themes.filter(theme =>
          theme.domains.includes(window.location.hostname));

        suitableThemes.forEach(theme => this.inject(theme));
      });
  },
};

export default ThemeInjector;
