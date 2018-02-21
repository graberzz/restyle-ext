import editMenu from './editMenu';
import block from './blockInit';

export default function init() {
    block.highlight();
    editMenu.init(block);
    console.log(block.currentBlock);
    document.body.setAttribute("contenteditable", true);
}

export function deinit() {
    block.dehighlight();
    editMenu.deinit();
    document.body.setAttribute("contenteditable", false);
}