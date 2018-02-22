import editMenu from './editMenu';

const block = {
    highlight() {
        this.onMouseOver = this.onMouseOver.bind(this);  
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onMouseClick = this.onMouseClick.bind(this);
        document.body.addEventListener("mouseover", this.onMouseOver);
        document.body.addEventListener("mouseout", this.onMouseOut);
        document.body.addEventListener("click", this.onMouseClick);
    },

    dehighlight() {
        document.body.removeEventListener("mouseover", this.onMouseOver);
        document.body.removeEventListener("mouseout", this.onMouseOut);
        document.body.removeEventListener("click", this.onMouseClick);
        if (this.mouseOverBlock) {
            this.mouseOverBlock.style.outlineStyle = 'none';
        }
        this.currentBlock.outlineStyle = 'none';
        editMenu.deinit();
    },

    onMouseClick(e) {
        if (e.target.classList.contains("menu-item")){
            e.stopPropagation();
            return;
        }
        if (this.currentBlock) {
            this.currentBlock.style.outlineStyle = 'none';
        }
        const elRect = e.target.getBoundingClientRect();
        const pos = {
            x: elRect.x + window.scrollX,
            y: elRect.y + window.scrollY,
        };
        e.target.style.outlineColor = 'orange';
        this.currentBlock = e.target;
        editMenu.init(e.target, pos);
    },

    onMouseOver(e) {
        if (e.target.classList.contains('menu-item') ||
            e.target === this.currentBlock) return;

        e.target.style.outlineStyle = "solid";
        e.target.style.outlineColor = "red";
        e.target.style.outlineWidth = "2px";
        this.mouseOverBlock = e.target;
    },

    onMouseOut(e) {
        if (e.target === this.currentBlock) return;
        e.target.style.outlineStyle = "none";
        this.mouseOverBlock = null;
    },    
};

export default block;
