var canvas;
var ctx;
var player;
var enemies = [];
var players = [];
var collides = [];
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

    player = new Player();
    player.pos.y += 80;
    player.pos.x += 25;
    player.set_gun(guns.shotgun);

    players.push(player);

    e1 = new Player("#000");
    e1.pos.y += 100;
    e1.pos.x += 300;

    enemies.push(e1);

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
    for (var i = enemies.length - 1; i >= 0; i--) {
        enemies[i]._draw(ctx);
    }

    player.draw(ctx);

    for (var i = collides.length - 1; i >= 0; i--) {
        var c = collides[i];
        ctx.fillStyle = c.color + c.opacity + ")";
        ctx.fillRect(c.x,c.y,c.w,c.w);
    }

    ctx.font = '12px helvetica';
    ctx.fillStyle = "#000";
    ctx.fillText(player.display_name, player.pos.x, player.pos.y - 20);
    ctx.fillText("Shots: " + player.gun.shots.length, 10, 20);
    ctx.fillText("X: " + player.pos.x, 10, 34);
    ctx.fillText("Y: " + player.pos.y, 10, 48);
}

function update(progress) {

    for (var i = enemies.length - 1; i >= 0; i--) {
        enemies[i]._update(progress);
    }
    player.update(progress);

    updateCollides(progress);
    checkShotCollision(progress);
}

function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#88DC70";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function updateCollides(progress) {
    for (var i = collides.length - 1; i >= 0; i--) {
        if(collides[i].w > 12){
            collides.splice(i,1);
        }
        else {
            if(collides[i].progress > 16) {
                collides[i].w += 1;
                collides[i].x -= .5;
                collides[i].y -= .5;
                collides[i].opacity -= .1;
                collides[i].progress = 0;
            }
            else {
                collides[i].progress += progress;
            }
        }
    }
}

function checkShotCollision() {
    for (var i = players.length - 1; i >= 0; i--) {
        var cp = players[i];
        var shots = cp.gun.shots;
        for (var j = shots.length - 1; j >= 0; j--) {
            var shot = shots[j];
            for (var k = enemies.length - 1; k >= 0; k--) {
                var enemy = enemies[k];
                if(isCollide(cp.get_shot_bounds(shot), 
                             {x:enemy.pos.x, y:enemy.pos.y, height:enemy.torso_top.height+enemy.torso_bottom.height+enemy.waist.height, width:enemy.torso_top.width})) {
                    collides.push({
                        x: shot.x + (cp.torso_top.width/2),
                        y: shot.y,
                        w: 1,
                        opacity: 1,
                        color: "rgba(255,0,0,",
                        progress: 0
                    });
                    players[i].gun.shots.splice(j, 1);
                }
            }
        }
    }
}

function isCollide(a, b) {
    /*
    expects both a and b to be objects with 
    x, y, width and height properties
    */
    return !(
        ((a.y + a.height) <= (b.y)) ||
        (a.y >= (b.y + b.height)) ||
        ((a.x + a.width) <= b.x) ||
        (a.x >= (b.x + b.width))
    );
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

// document.onmouseup = function(ev) {
//     mouseDown = false;
//     var i = keys.indexOf(ev.keyCode);
// }

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