import { MenuButton, MenuComboBox, MenuInput } from "./menuItem";
import icon from '../../img/icons/cancel.png';
import domtoimage from 'dom-to-image';
import fileSaver from 'file-saver';
import drawing from "./pageDrawing";
import { colorToHex, styleInPage } from './utils';
import MenuItemGroup from './menuItemGroup';


const editMenu = {
    init(currentBlock, pos, blockInit) {
        this.currentBlock = currentBlock;
        this.blockInit = blockInit;

        this.elem = document.createElement('div');
        this.elem.classList.add('edit-menu');
        this.elem.setAttribute("contenteditable", false);

        this.menuItemsGroup = [
            new MenuItemGroup(this.elem, [
                new MenuComboBox({
                    link: this,
                    list: Array.from(new Set(["Arial", "Times New Roman", "Consolas", "Comic Sans MS", ...styleInPage('fontFamily').map(font => font.split(',')[0].replace(/"/g, ''))])),
                    change: function (selectedValue) {
                        this.currentBlock.style.fontFamily = selectedValue;
                    },
                    setInitialValue(block, elem) {
                        const initFont = getComputedStyle(block).getPropertyValue('font-family').split(',')[0].replace(/"/g, '');
                        elem.options.selectedIndex = [...elem.options].map(opt => opt.text).indexOf(initFont);
                    },
                }),
                new MenuComboBox({
                    link: this,
                    list: ['center', 'justify', 'left', 'right'],
                    change(selectedValue) {
                        this.currentBlock.style.textAlign = selectedValue;
                    },
                    setInitialValue(block, elem) {
                        const initAlign = getComputedStyle(block).getPropertyValue('text-align');
                        elem.options.selectedIndex = [...elem.options].map(opt => opt.text).indexOf(initAlign);
                    }
                }),
                new MenuInput({
                    link: this,
                    type: 'number',
                    id: 'font-size',
                    list: [4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 46, 58, 72],
                    change(selectedValue) {
                        console.log(selectedValue);
                        this.currentBlock.style.fontSize = selectedValue + 'px';
                    },
                    setInitialValue(block, elem) {
                        elem.min = 0;
                        alert('1');
                        const initFontSize = getComputedStyle(block).getPropertyValue('font-size');
                        elem.value = parseInt(initFontSize);
                    },
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
                    },
                    setInitialValue(block, elem) {
                        const initColor = colorToHex(getComputedStyle(block).getPropertyValue('color'));
                        elem.value = initColor;
                    },
                }),
                new MenuInput({
                    link: this,
                    id: 'background',
                    type: 'color',
                    text: '',
                    change: function (value) {
                        this.currentBlock.style.backgroundColor = value;
                    },
                    setInitialValue(block, elem) {
                        const initColor = colorToHex(getComputedStyle(block).getPropertyValue('background-color'));
                        elem.value = initColor;
                    },
                }),
            ]),
            new MenuItemGroup(this.elem, [
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
            ]),
            new MenuItemGroup(this.elem, [
                new MenuButton({
                    link: this,
                    id: 'page-drawing',
                    text: 'Page Drawing',
                    click: function () {                    
                        let body = document.body,
                            html = document.documentElement;

                        let height = Math.max( body.scrollHeight, body.offsetHeight, 
                                               html.clientHeight, html.scrollHeight, html.offsetHeight );
                        let width = Math.max( body.scrollWidth, body.offsetWidth, 
                                               html.clientWidth, html.scrollWidth, html.offsetWidth );

                        if (!drawing.isInit()){
                            drawing.init(document.body, width, height);
                            alert('Drawing on page is avalable. Press on button again for disabling');
                            // Ayaz, pochemu ya ne mogu tut menyat peremennie menu itema?
                            this.text = 'Stop Page Drawing';
                            this.setPos({
                                x: 0,
                                y: 0,
                            });
                        }
                        else
                        {
                            drawing.deinit();
                            this.text = 'Start Page Drawing';
                            // this.setPos(pos);
                            // this.setPos({
                            //     x: this.currentBlock.getBoundingClientRect().x + window.scrollX,
                            //     y: this.currentBlock.getBoundingClientRect().y + window.scrollY - 25,
                            // });
                        }
                    },
                }),              
            ])
        ];
        this.menuItems = [
            new MenuButton({
                link: this,
                id: 'delete',
                text: 'Delete',
                click: function () {
                    this.currentBlock.outerHTML = "";
                    document.body.removeChild(this.elem);
                },
            }),

            new MenuButton({
                link: this,
                id: 'text-group',
                text: 'Text',
                click: function () {
                    this.menuItemsGroup[0].toggle();
                },
            }),

            new MenuButton({
                link: this,
                id: 'save-group',
                text: 'Save',
                click: function () {
                    this.menuItemsGroup[1].toggle();
                },
            }),

            new MenuButton({
                link: this,
                id: 'draw-group',
                text: 'Draw',
                click: function () {
                    this.menuItemsGroup[2].toggle();
                },
            }),

        ];
        for (let menuItem of this.menuItems) {
            if (menuItem.setInitialValue) {
                menuItem.setInitialValue();
            }
            this.elem.appendChild(menuItem.elem);   
        }
        document.body.appendChild(this.elem);
        this.setPos(pos);
    },

    deinit() {
        if (!document.body.contains(this.elem)) return;

        document.body.removeChild(this.elem);
        this.elem = null;
    },

    setPos(pos) {
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