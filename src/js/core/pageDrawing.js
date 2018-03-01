const drawing = {
    init(mainElement, width, height){
        this.mainElement = mainElement;
        this.canvas = document.createElement('canvas');
        this.canvas.id = "itcanvas";
        this.canvas.width = width;
        this.canvas.height = height;
        this.mainElement.appendChild(this.canvas);
        this.mainElement.insertAdjacentElement('afterbegin', this.canvas)  
        this.context = this.canvas.getContext("2d");
        this.onMouseDown = this.onMouseDown.bind(this);  
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.canvas.addEventListener('mousedown', this.onMouseDown);
        this.canvas.addEventListener('mouseup', this.onMouseUp);
        this.canvas.addEventListener('mousemove', this.onMouseMove);
    },

    deinit(){
        this.mainElement.removeChild(this.canvas);
    },

    isInit(){
        if (this.mainElement == undefined || this.mainElement == null)
            return false;
        return this.mainElement.contains(this.canvas);
    },

    onMouseDown(e){
        this.mouseIsPressed = true;
        this.xPast = (e.clientX + window.scrollX) - this.canvas.offsetLeft;
        this.yPast = (e.clientY + window.scrollY) - this.canvas.offsetTop;
    },

    onMouseUp(e){
        this.mouseIsPressed = false;
    },

    onMouseMove(e){
        if (this.mouseIsPressed) {
            this.xCurr = (e.clientX + window.scrollX) - this.canvas.offsetLeft;
            this.yCurr = (e.clientY + window.scrollY) - this.canvas.offsetTop;

            this.context.beginPath();
            this.context.moveTo(this.xPast, this.yPast);
            this.context.lineTo(this.xCurr, this.yCurr);
            this.context.closePath();
            this.context.stroke();

            this.xPast = this.xCurr;
            this.yPast = this.yCurr;
        }
    },
};

export default drawing;