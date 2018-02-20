export default class MenuItem {
    constructor(props) {
        this.icon = props.icon;
        this.elem = document.createElement('button');
        this.elem.classList.add('menu-item');
        this.elem.style.backgroundImage = `url(${this.icon}`;
        this.elem.style.backgroundColor = 'green';
        this.action = props.action.bind(this.elem);
        this.elem.addEventListener('click', this.action);
    }    
}