import MenuItem from "./menuItem";
import icon from '../../img/icon-34.png';

const editMenu = {

    init: function(block) {
        this.menuItems = [
          new MenuItem({
              icon: icon,
              action: function() {
                  console.log(block.currentBlock);
              },
          })
        ];

        this.elem = document.createElement('div');
        this.elem.classList.add('edit-menu');
        for (let menuItem of this.menuItems) {
            this.elem.appendChild(menuItem.elem);   
        }
        document.body.appendChild(this.elem);
    },

    deinit: function() {
        document.body.removeChild(this.elem);
    }

};

export default editMenu;