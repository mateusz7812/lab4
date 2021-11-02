function getElementTopLeft(id) {

    var ele = document.getElementById(id);
    var top = 0;
    var left = 0;
   
    while(ele.tagName != "BODY") {
        top += ele.offsetTop;
        left += ele.offsetLeft;
        ele = ele.offsetParent;
    }
   
    return { top: top, left: left };
   
}

function resizeCanvas() {
    let c = document.getElementById('my-canvas');
    let m = document.getElementById('canvas-main');
    c.width = m.clientWidth;
    c.height = m.clientHeight;
}

function runCanvas(){
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, false);

    const c = document.getElementById('my-canvas');
    const ctx = c.getContext('2d');
    let win;
    let cords;
    document.onmousemove = function(e){
        console.log("mouse location:", e.clientX, e.clientY);
        win, cords = getElementTopLeft('my-canvas');
        console.log("canvas location: ", cords.top, cords.left);
        ctx.clearRect(0, 0, c.width, c.height);

        let canvX = e.clientX - cords.left;
        let canvY = e.clientY - cords.top;
        if(canvX > 0 && canvY > 0 && canvX < c.width && canvY < c.height){
            ctx.beginPath();

            ctx.moveTo(0, 0);
            ctx.lineTo(canvX, canvY);

            ctx.moveTo(c.width, 0);            
            ctx.lineTo(canvX, canvY);

            ctx.moveTo(0, c.height);            
            ctx.lineTo(canvX, canvY);

            ctx.moveTo(c.width, c.height);            
            ctx.lineTo(canvX, canvY);

            ctx.closePath();
            ctx.strokeStyle = '#5555ff';
            ctx.lineWidth = 3;
            ctx.stroke();
        }
    };
}

$(document).ready(runCanvas)