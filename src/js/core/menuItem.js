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
        this.elem.addEventListener('change', (e) => {
            props.change.call(this.link, this.elem.options[this.elem.selectedIndex].value);
        });
        if(props.setInitialValue) {
            this.setInitialValue = props.setInitialValue.bind(this, this.link.currentBlock, this.elem);
        }
     
    }
}

export class MenuInput {
    constructor(props) {
        this.link = props.link;
        this.id = props.id;
        this.elem = document.createElement('div');
        this.elem.id = this.id;
        this.elemInput = document.createElement('input');
        this.elemInput.type = props.type;
        this.elemInput.innerHTML = props.text;
        this.list = props.list || null;
        if (this.list) {
            const dl = document.createElement('datalist');
            dl.id = this.id + '_ds';
            for(let i of this.list) {
                dl.appendChild(new Option(i));
            }
            this.elemInput.setAttribute('list', dl.id);
            this.elem.appendChild(dl);
        }
        this.elemInput.addEventListener('change', (e) => {
            props.change.call(this.link, this.elemInput.value);
        });
        if(props.setInitialValue) {
            this.setInitialValue = props.setInitialValue.bind(this, this.link.currentBlock, this.elemInput);
        }
            this.elem.appendChild(this.elemInput);
        // this.click = props.click.bind(this.link);
        // this.elem.addEventListener('click', this.click);
    }
}