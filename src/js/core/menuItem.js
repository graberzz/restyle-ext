export default class MenuItem {
    constructor(props) {
        this.menu = props.menu;
        this.icon = props.icon;
        this.elem = document.createElement('button');
        this.elem.classList.add('menu-item');
        this.elem.style.backgroundImage = `url(${this.icon}`;
        this.elem.style.backgroundColor = 'green';
        this.action = props.action.bind(this.menu);
        this.elem.addEventListener('click', this.action);
    }    
}