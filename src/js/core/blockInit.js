export default const block = {

    highlight: function() {
        document.body.addEventListener("mouseover", this.onMouseOver);
        document.body.addEventListener("mouseout", this.onMouseOut);
        window.onclick = this.onMouseClick;
        // document.body.addEventListener("click", this.onMouseClick);
    }

    dehighlight: function() {
        document.body.removeEventListener("mouseover", this.onMouseOver);
        document.body.removeEventListener("mouseout", this.onMouseOut);
    }

    onMouseClick: function(e) {
        debugger
        this.currentBlock = e.target;
        console.log(this.currentBlock)
        console.log("fgsdfdsfdsfkljmdflds")
        alert(this.currentBlock)
    }

    onMouseOver: function(e) {
        e.target.style.outlineStyle = "solid";
        e.target.style.outlineColor = "red";
        e.target.style.outlineWidth = "2px";
    }

    onMouseOut: function(e){
        e.target.style.outlineStyle = "none";
        e.target.style.outlineWidth = "0";
    }    
}


