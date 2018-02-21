import MenuItem from "./menuItem";
import icon from '../../img/icon-34.png';

export default const editMenu = {

    init: function(currentBlock) {
        this.menuItems = [
          new MenuItem({
              icon: icon,
              action: function() {
                  console.log(currentBlock);
              },
          })
        ],
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