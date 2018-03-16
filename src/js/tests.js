const CSSJSON = require('./lib/cssjson');
// const nodeSelector = require('./nodeSelector');

const removeSpaces = str => str.replace(/\s/g, '');


// CSS PARSER
const stylesheet = `.im-page .im-page--center-empty {
                        position: absolute;
                        display: none;
                        width: 180px;
                        height: 115px;
                        top: 50%;
                        left: 50%;
                        margin-left: -90px;
                        margin-top: -90px;
                        box-sizing: border-box;
                        color: #929eb0;
                        line-height: 22px;
                        text-align: center;
                        padding-top: 86px;
                        background: url(/images/icons/empty_icon.png) no-repeat top;
                    }
                    .nim-dialog {
                        height: 63px;
                        box-sizing: border-box;
                        padding: 0 0 0 15px;
                        display: block;
                        width: 100%;
                        cursor: pointer;
                    }
                    @media (max-width: 400px) {
                        .nim-dialog {
                            width: 100px;
                            margin-left: 10px;
                        }
                    }`;
console.log(CSSJSON.toJSON(stylesheet));
console.assert(removeSpaces(stylesheet) === removeSpaces(CSSJSON.toCSS(CSSJSON.toJSON(stylesheet))));
// CSS PARSER END


// NODE SELECTOR

// TODO: nodeSelector tests

// NODE SELECTOR END

