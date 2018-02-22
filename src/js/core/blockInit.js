import editMenu from './editMenu';

const block = {
    highlight: function() {
        document.body.addEventListener("mouseover", this.onMouseOver);
        document.body.addEventListener("mouseout", this.onMouseOut);
        document.body.addEventListener("click", this.onMouseClick);
    },

    dehighlight: function() {
        document.body.removeEventListener("mouseover", this.onMouseOver);
        document.body.removeEventListener("mouseout", this.onMouseOut);
        document.body.removeEventListener("click", this.onMouseClick);
    },

    onMouseClick: function(e) {
        if (e.target.classList.contains("menu-item")){
            e.stopPropagation();
            return;
        }
        this.currentBlock = e.target;
        const elRect = e.target.getBoundingClientRect();
        const pos = {
            x: elRect.x + window.scrollX,
            y: elRect.y + window.scrollY,
        };
        editMenu.init(this.currentBlock, pos);
    },

    onMouseOver: function(e) {
        e.target.style.outlineStyle = "solid";
        e.target.style.outlineColor = "red";
        e.target.style.outlineWidth = "2px";
    },

    onMouseOut: function(e) {
        e.target.style.outlineStyle = "none";
    },    
};

export default block;
