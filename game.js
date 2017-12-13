var canvas;
var ctx;
var player;
var frame = 0;
var lastRender = 0;
var mousePosition = {
    x: 0,
    y: 0
};

function init() {
    var height = window.innerHeight;
    var width = window.innerWidth;

    canvas = document.getElementById('canvas');
    canvas.height = height;
    canvas.width = width;

    ctx = canvas.getContext('2d');

    player = new human();
    player.pos.y += 80;
    player.pos.x += 25;
    player.gun = guns.shotgun;

    requestAnimFrame(gameLoop);
}

function gameLoop(timestamp) {
    var progress = timestamp - lastRender;
    frame++;
    if(frame > 120) {
        frame = 0;
    }

    clear();
    update(progress);
    ctx.save()
    draw();
    ctx.restore();

    lastRender = timestamp;
    requestAnimFrame(gameLoop); 
}

function draw() {
    player.draw(ctx);

    ctx.font = '12px helvetica';
    ctx.fillStyle = "#000";
    ctx.fillText("P1", player.pos.x, player.pos.y - 20);
}

function update(progress) {
    player.update(progress);
}

function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#88DC70";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame;
    //function(/* function */ callback, /* DOMElement */ element){
    //  window.setTimeout(callback, 1000/60);
    //};
})();

function mouseMove(e) {
    var rect = canvas.getBoundingClientRect();
    mousePosition = {
        x: (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}
window.addEventListener('mousemove', mouseMove, false)

document.onkeydown = function(ev) {
    if(keys.indexOf(ev.keyCode) == -1)
    {
        keys.push(ev.keyCode);
    }
}

document.onkeyup = function(ev) {
    var i = keys.indexOf(ev.keyCode);
    if (i != -1) {
        keys.splice(i, 1);
    }
}

var mouseDown = false;
document.onmousedown = function(ev) {
    mouseDown = true;
}

document.onmouseup = function(ev) {
    mouseDown = false;
    var i = keys.indexOf(ev.keyCode);
}

var keys = [];
function checkKeys() {
    var lastX = player.pos.x;
    var lastY = player.pos.y;
    
    var newX = 0;
    var newY = 0;
    var speed = 2;
    var lastDirection = player.pos.face;
    var newHoriz = lastDirection[0];
    var newVert = lastDirection[1];
    var moving = false;

    for(i in keys)
    {
        var aKey = keys[i];
        if((aKey == 37) || (aKey == 65)){
            newX -= speed; //left
            newHoriz = 'l';
            moving = true;
        }
        if((aKey == 39) || (aKey == 68)){
            newX += speed; // right
            newHoriz = 'r';
            moving = true;
        }
        if((aKey == 38) || (aKey == 87)){
            newY -= speed; // up
            newVert = 'b';
            moving = true;
        }
        if((aKey == 40) || (aKey == 83)){
            newY += speed; // down
            newVert = 'f';
            moving = true;
        }

        // if(aKey == 32)//spacebar
        // {
        //     shootRay = true;
        //     //console.log("space");
        // }
    }

    
    // thisPlayer.incRay();
    // if(mouseDown == true)
    //     thisPlayer.manageAmmo();
    
    player.pos.x += newX;
    player.pos.y += newY;
    player.pos.face = newHoriz + newVert;
    player.pos.moving = moving;
    
    if (player.pos.x + 40 > canvas.width || player.pos.x < 0)
        player.pos.x -= newX;
    if (player.pos.y + 100 > canvas.height || player.pos.y < 0)
        player.pos.y -= newY;
    
    //scrollWrapper(x,y);
        
}

(function(){
    init();
})();