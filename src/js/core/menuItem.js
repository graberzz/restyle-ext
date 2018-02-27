/*
export default class MenuItem {
    constructor(props) {
        this.menu = props.menu;
        this.icon = props.icon;
        this.elem = document.createElement('div');
        this.elem.classList.add('menu-item');
        this.btn = document.createElement('button');
        this.btn.textContent = props.text;
        this.elem.appendChild(this.btn);
        this.options = props.options;
        if (this.options) {
            this.selectElem = document.createElement('select');
            for (let i = 0; i < this.options.length; i++) {
                const optionElem = document.createElement('option');
                optionElem.textContent = this.options[i];
                optionElem.value = this.options[i];
                optionElem.dataset.id = i;
                if (i === this.selectedOption) {
                    optionElem.setAttribute('selected', true);
                }
                this.selectElem.appendChild(optionElem);
            }
            this.selectElem.addEventListener('change', (e) => {
                this.selectedOption = e.target.dataset.id;
                props.onOptionChange.call(this, this.selectElem.options[this.selectElem.selectedIndex].value);
            });
            this.elem.appendChild(this.selectElem);
        }
        //this.elem.style.backgroundImage = `url(${this.icon}`;
        this.elem.style.backgroundColor = 'green';
        this.action = props.action.bind(this);
        this.btn.addEventListener('click', this.action);
    }    
}
*/

export class MenuButton {
    constructor(props) {
        this.link = props.link;
        this.icon = props.icon;
        this.elem = document.createElement('button');
        this.elem.classList.add('menu-button');
        this.elem.innerHTML = props.text;
        this.elem.style.backgroundImage = `url(${this.icon}`;
        this.click = props.click.bind(this.link);
        this.elem.addEventListener('click', this.click);
    }    
}

export class MenuComboBox {
    constructor(props) {
        this.link = props.link;
        this.list = props.list;
        this.elem = document.createElement("select");
        this.elem.classList.add('menu-combobox');
        for (let i = 0; i < this.list.length; i++) {
            let o = document.createElement("option");
            o.value = o.text = this.list[i];
            this.elem.add(o);
        }
        // this.change = props.change.bind(this.link);
        this.elem.addEventListener('change', (e) => {
            this.selectedOption = e.target.dataset.id;
            props.change.call(this.link, this.elem.options[this.elem.selectedIndex].value);
        });
    }
}