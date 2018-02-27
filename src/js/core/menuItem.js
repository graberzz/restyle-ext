export class MenuButton {
    constructor(props) {
        this.link = props.link;
        this.id = props.id;
        this.elem = document.createElement('button');
        this.elem.classList.add('menu-button');
        this.elem.id = this.id;
        this.elem.innerHTML = props.text;
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