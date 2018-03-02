export default class MenuItemGroup {
    constructor(mainElement, list){
        this.toggled = false;
        this.mainElement = mainElement;
        this.elem = document.createElement('div');
        this.elem.classList.add('item-group');
        for (let i = 0; i < list.length; i++) {
            this.elem.appendChild(list[i].elem);
        }
    }

    toggle() {
        if (!this.toggled){
            this.mainElement.appendChild(this.elem);
        }
        else {
            this.mainElement.removeChild(this.elem);
        }
        this.toggled = !this.toggled;
    }

    // show() {
    //     this.mainElement.appendChild(this);
    // }

    // hide() {
    //     this.mainElement.removeChild(this);
    // }
}