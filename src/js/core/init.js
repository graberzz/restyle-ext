import editMenu from './editMenu';
import block from './blockInit';

export default function init() {
    alert(undefined);
    alert("mocha");
    block.highlight();
    editMenu.init(block.currentBlock);
    document.body.setAttribute("contenteditable", true);
}

export function deinit() {
    block.dehighlight();
    editMenu.deinit();
    document.body.setAttribute("contenteditable", false);
}