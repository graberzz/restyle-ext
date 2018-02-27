import { MenuButton, MenuComboBox } from "./menuItem";
import icon from '../../img/icons/cancel.png';

const editMenu = {
    init(currentBlock, pos) {
        this.currentBlock = currentBlock;        
        this.menuItems = [
            new MenuButton({
                link: this, 
                icon: null,
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
                icon: null,
                text: '<b>B</b>',
                click: function () {
                    this.currentBlock.style.fontWeight = this.currentBlock.style.fontWeight != "bold" ? "bold" : "normal";
                },
            }),
            new MenuButton({
                link: this, 
                icon: null,
                text: '<i>I</i>',
                click: function () {
                    this.currentBlock.style.fontStyle = this.currentBlock.style.fontStyle != "italic" ? "italic" : "normal";
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
        if (!this.elem) return;
        document.body.removeChild(this.elem);
    },

    setPos(pos) {
        console.log(pos);
        this.elem.style.left = `${pos.x}px`;
        this.elem.style.top = `${pos.y}px`;
        this.pos = pos;
    },

};

export default editMenu;