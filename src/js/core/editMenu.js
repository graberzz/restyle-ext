import MenuItem from "./menuItem";
import icon from '../../img/icon-34.png';

const editMenu = {
    init(currentBlock, pos) {
        this.currentBlock = currentBlock;        
        this.menuItems = [
            new MenuItem({
                menu: this, 
                icon: icon,
                action: function() {
                    console.log(this.currentBlock);
                },
            })
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