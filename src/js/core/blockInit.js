const block = {

    currentBlock: null,

    highlight: function() {
        document.body.addEventListener("mouseover", this.onMouseOver);
        document.body.addEventListener("mouseout", this.onMouseOut);
        document.body.addEventListener("click", this.onMouseClick.bind(this));
    },

    dehighlight: function() {
        document.body.removeEventListener("mouseover", this.onMouseOver);
        document.body.removeEventListener("mouseout", this.onMouseOut);
    },

    onMouseClick: function(e) {
        if (e.target.classList.contains("menu-item")){
            e.stopPropagation();
            return;
        }
        this.currentBlock = e.target;
        console.log(this)
    },

    onMouseOver: function(e) {
        e.target.style.outlineStyle = "solid";
        e.target.style.outlineColor = "red";
        e.target.style.outlineWidth = "2px";
    },

    onMouseOut: function(e){
        e.target.style.outlineStyle = "none";
        e.target.style.outlineWidth = "0";
    }    
}

export default block;
