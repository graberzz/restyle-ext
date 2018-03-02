function colorToRGBA(color) {
    var cvs, ctx;
    cvs = document.createElement('canvas');
    cvs.height = 1;
    cvs.width = 1;
    ctx = cvs.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    return ctx.getImageData(0, 0, 1, 1).data;
}

function byteToHex(num) {
    return ('0'+num.toString(16)).slice(-2);
}

export function colorToHex(color) {
    var rgba, hex;
    rgba = colorToRGBA(color);
    hex = [0,1,2].map(
        function(idx) { return byteToHex(rgba[idx]); }
        ).join('');
    return "#"+hex;
}

export function styleInPage(css, verbose){
    if(typeof getComputedStyle== "undefined")
    getComputedStyle= function(elem){
        return elem.currentStyle;
    }
    var who, hoo, values= [], val, val_before, val_after,
    nodes= document.body.getElementsByTagName('*'),
    L= nodes.length;
    for(var i= 0; i<L; i++){
        who= nodes[i];
        if(who.style){
            hoo= '#'+(who.id || who.nodeName+'('+i+')');
            val= who.style.fontFamily || getComputedStyle(who, '')[css];
            if(val){
                if(verbose) values.push([hoo, val]);
                else if(values.indexOf(val)== -1) values.push(val);
            }
            val_before = getComputedStyle(who, ':before')[css];
            if(val_before){
                if(verbose) values.push([hoo, val_before]);
                else if(values.indexOf(val_before)== -1) values.push(val_before);
            }
            val_after= getComputedStyle(who, ':after')[css];
            if(val_after){
                if(verbose) values.push([hoo, val_after]);
                else if(values.indexOf(val_after)== -1) values.push(val_after);
            }
        }
    }
    return values;
}