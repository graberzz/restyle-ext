import block from './blockInit';

export default function init() {
    block.highlight();
    document.body.setAttribute("contenteditable", true);
}

export function deinit() {
    block.dehighlight();
    document.body.setAttribute("contenteditable", false);
}