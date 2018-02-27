import MenuItem from "./menuItem";
import icon from '../../img/icon-34.png';

const editMenu = {
    init(currentBlock, pos) {
        this.currentBlock = currentBlock;        
        this.menuItems = [
            new MenuItem({
                menu: this, 
                icon: icon,
                text: 'Delete Block',
                action: function() {
                    this.menu.currentBlock.outerHTML = "";
                    document.body.removeChild(this.elem);
                },
            }),
            new MenuItem({
                menu: this,
                text: 'Font Size',
                icon,
                action: function() {
                    
                },
                options: [7, 8, 9, 10, 11, 12, 13, 14, 16, 18, 24, 32, 36, 40, 56, 64],
                onOptionChange(selectedValue) {
                    this.menu.currentBlock.style.fontSize = selectedValue + 'px';
                },
            }),
        ];
        if (!this.elem) {
            this.elem = document.createElement('div');
            this.elem.classList.add('edit-menu');
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