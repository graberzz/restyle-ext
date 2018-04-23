const toJSON = (css) => {
  const json = {};
  let nested = false;
  let inURL = false;
  let currentProp = null;
  let selectorAwaits = css.indexOf('{') !== -1;
  let comment = false;
  let propStart = 0;
  let depth = 0;

  for (let i = 0; i < css.length; i++) {
    if (css[i] === '/' && css[i + 1] === '*' && !inURL) {
      comment = true;
      i += 1;
    } else if (comment && css[i] === '*' && css[i + 1] === '/') {
      comment = false;
      i += 1;
      propStart = i + 1;
    }
    if (comment) continue;

    if (css.slice(i, i + 4) === 'url(') {
      inURL = true;
    } else if (css[i] === ')' && inURL) {
      inURL = false;
    } else if (css[i] === '{') {
      if (nested) {
        depth++;
        json[currentProp] += css[i];
        continue;
      }
      nested = true;
      currentProp = css.slice(propStart, i).trim();
      json[currentProp] = '';
      selectorAwaits = false;
      continue;
    } else if (css[i] === '}') {
      if (depth > 0) {
        depth--;
        json[currentProp] += css[i];
        continue;
      }
      json[currentProp] = toJSON(json[currentProp]);
      currentProp = null;
      selectorAwaits = true;
      nested = false;
      propStart = i + 1;
      continue;
    } else if (css[i] === ':' && !nested && !selectorAwaits && !inURL) {
      currentProp = css.slice(propStart, i).trim();
      json[currentProp] = '';
      continue;
    } else if (css[i] === ';' && !nested && !inURL) {
      json[currentProp] = json[currentProp].trim();
      currentProp = null;
      propStart = i + 1;
      continue;
    }
    if (currentProp) json[currentProp] += css[i];
  }

  return json;
};

const toCSS = (json, nested = false) => {
  let css = '';
  if (nested) css += '{';

  for (const prop of Object.keys(json)) {
    if (typeof json[prop] === 'string') {
      css += prop + ':' + json[prop] + ';';
    } else {
      css += prop;
      css += toCSS(json[prop], true);
    }
  }
  if (nested) css += '}';

  return css;
};

export {
  toJSON,
  toCSS,
};
