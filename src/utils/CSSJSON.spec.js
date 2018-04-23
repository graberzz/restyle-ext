import { toJSON, toCSS } from './CSSJSON';
/* global test */

describe('CSS to JSON and back converter', () => {
  test('converts css to json and back', () => {
    const css = `
    h1 {
      color: blue;
      margin: 10px;
      padding: 10px 20px 30px;
    }
    
    #id {
      outline-width: 10em;
    }
    `;

    const minCss = 'h1{color:blue;margin:10px;padding:10px 20px 30px;}#id{outline-width:10em;}';

    const expectedJSON = {
      h1: {
        color: 'blue',
        margin: '10px',
        padding: '10px 20px 30px',
      },
      '#id': {
        'outline-width': '10em',
      },
    };

    expect(toJSON(css)).toEqual(expectedJSON);
    expect(toCSS(expectedJSON)).toEqual(minCss);
  });

  test('handles pseudo elements & classes, urls', () => {
    const css = `
    .Block__Element--Modifier::after {
      content: '';
      margin: -1px;
      background: url(data:image/gif;base64,R0lG);
    }
    
    .Zest:hover {
      opacity: .7;
    }`;

    const minCss = ".Block__Element--Modifier::after{content:'';margin:-1px;background:url(data:image/gif;base64,R0lG);}.Zest:hover{opacity:.7;}";

    const expectedJSON = {
      '.Block__Element--Modifier::after': {
        content: "''",
        margin: '-1px',
        background: 'url(data:image/gif;base64,R0lG)',
      },
      '.Zest:hover': {
        opacity: '.7',
      },
    };

    expect(toJSON(css)).toEqual(expectedJSON);
    expect(toCSS(expectedJSON)).toEqual(minCss);
  });

  test('handles keyframes & media queries', () => {
    const expectedJSON = {
      '@media (screen and max-width: 980px)': {
        'h1.ready': {
          color: 'red',
        },
        'p#full': {
          animation: 'spin 1s infinite',
        },
      },
      '@keyframes spin': {
        from: {
          transform: 'rotate(0deg)',
          'background-color': '#fff',
        },
        to: {
          transform: 'rotate(360deg)',
          'background-color': '#000',
        },
      }
    };

    const css = `
    @media (screen and max-width: 980px) {
      h1.ready {
        color: red;
      }
      p#full {
        animation: spin 1s infinite;
      }
    }
    @keyframes spin {
      from {
        transform: rotate(0deg);
        background-color: #fff;
      }
      to {
        transform: rotate(360deg);
        background-color: #000;
      }
    }`;
    const minCss = '@media (screen and max-width: 980px){h1.ready{color:red;}p#full{animation:spin 1s infinite;}}@keyframes spin{from{transform:rotate(0deg);background-color:#fff;}to{transform:rotate(360deg);background-color:#000;}}';

    expect(toJSON(css)).toEqual(expectedJSON);
    expect(toCSS(expectedJSON)).toEqual(minCss);
  });

  test('skips comments', () => {
    const expectedJSON = {
      div: {
        color: 'cyan',
      },
    };

    const css = `
    /* comment is here */
    div {
      color: cyan;
    }
    `;

    const minCss = 'div{color:cyan;}';

    expect(toJSON(css)).toEqual(expectedJSON);
    expect(toCSS(expectedJSON)).toEqual(minCss);
  });
});

