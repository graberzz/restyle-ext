import { MenuButton, MenuComboBox, MenuInput } from "./menuItem";
import icon from '../../img/icons/cancel.png';
import domtoimage from 'dom-to-image';
import fileSaver from 'file-saver';

const editMenu = {
    init(currentBlock, pos, blockInit) {
        this.currentBlock = currentBlock;
        this.blockInit = blockInit;        
        this.menuItems = [
            new MenuButton({
                link: this,
                id: 'delete',
                text: 'Delete',
                click: function () {
                    console.log(this.currentBlock);
                    this.currentBlock.outerHTML = "";
                    document.body.removeChild(this.elem);
                },
            }),
            new MenuComboBox({
                link: this,
                list: ["Arial", "Times New Roman", "Consolas", "Comic Sans MS"],
                change: function (selectedValue) {
                    this.currentBlock.style.fontFamily = selectedValue;
                }
            }),
            new MenuComboBox({
                link: this,
                list: [8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 24, 26, 28, 36, 48, 72],
                change: function (selectedValue) {
                    this.currentBlock.style.fontSize = selectedValue + 'px';
                }
            }),
            new MenuButton({
                link: this,
                id: 'bold',
                text: '<b>B</b>',
                click: function () {
                    this.currentBlock.style.fontWeight = this.currentBlock.style.fontWeight != "bold" ? "bold" : "normal";
                },
            }),
            new MenuButton({
                link: this,
                id: 'italic',
                text: '<i>I</i>',
                click: function () {
                    this.currentBlock.style.fontStyle = this.currentBlock.style.fontStyle != "italic" ? "italic" : "normal";
                },
            }),
            new MenuInput({
                link: this,
                id: 'color',
                type: 'color',
                text: '',
                change: function (value) {
                    this.currentBlock.style.color = value;
                }
            }),
            new MenuInput({
                link: this,
                id: 'background',
                type: 'color',
                text: '',
                change: function (value) {
                    this.currentBlock.style.backgroundColor = value;
                }
            }),
            new MenuButton({
                link: this,
                id: 'save-btn',
                text: 'Save as HTML',
                click() {
                    this.blockInit.dehighlight();
                    chrome.runtime.sendMessage({mes: 'saveHTML_action' });
                },
            }),
            new MenuButton({
                link: this,
                id: 'save-screen',
                text: 'Save as PNG',
                click() {
                    const block = this.currentBlock;
                    this.blockInit.dehighlight();
                    domtoimage.toBlob(block)
                        .then(function (blob) {
                            fileSaver.saveAs(blob, 'my-node.png');
                        });
                },
            }), 
        ];
        if (!this.elem) {
            this.elem = document.createElement('div');
            this.elem.classList.add('edit-menu');
            this.elem.setAttribute("contenteditable", false);
            for (let menuItem of this.menuItems) {
                this.elem.appendChild(menuItem.elem);   
            }
        }
        document.body.appendChild(this.elem);
        this.setPos(pos);
    },

    deinit() {
        if (!document.body.contains(this.elem)) return;

        document.body.removeChild(this.elem);
    },

    setPos(pos) {
        console.log(pos);
        console.log(this.elem);
        if (pos.x + this.elem.getBoundingClientRect().width > window.innerWidth){
            this.elem.style.right = '0px';
            this.elem.style.left = null;
        }
        else {
            this.elem.style.left = `${pos.x}px`;
            this.elem.style.right = null;
        }
        this.elem.style.top = pos.y < 0 ? 0 : `${pos.y}px`;
        this.pos = pos;
    },

};

export default editMenu;