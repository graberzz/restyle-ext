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
          theme.domains.includes(window.location.hostname) && theme.enabled);

        suitableThemes.forEach(theme => this.inject(theme));
      });
  },

  clear() {
    while (this.injected.length > 0) {
      this.eject(this.injected.length - 1);
    }
  },
};

export default ThemeInjector;
