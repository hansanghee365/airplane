/** @type {HTMLCanvasElement} */
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var bgi = {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
var img1 = new Image();
img1.src = 'airplane1.png'

var airPlane = {
    x: (window.innerWidth / 2) - 70,
    y: window.innerHeight - 70,
    width: 70,
    height: 70,
    draw() {
        ctx.fillStyle = 'white';
        ctx.drawImage(img1, this.x, this.y);
    }
}

class Gun {
    constructor() {
        this.x = airPlane.x + 35,
            this.y = airPlane.y - 70,
            this.width = 10,
            this.height = 20
    }
    draw() {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
// var ax;
// function anyX() {
//     ax = Math.floor(Math.random() * (canvas.width - 0 + 1) + 0);
//     console.log(ax);
// }
// anyX();
var img2 = new Image();
img2.src = 'enemy.png';
class Enemy {
    constructor() {
        this.x = Math.floor(Math.random() * (canvas.width - 0 + 1) + 0);
        this.y = 0;
        this.width = 70;
        this.height = 70;
    }
    draw() {
        ctx.fillStyle = 'white';
        ctx.drawImage(img2, this.x, this.y);
    }
}


var score = 0;
var timer = 0;
var gunList = [];
var enemyList = [];
var animation;
function framePlay() {
    animation = requestAnimationFrame(framePlay);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    timer++;
    bgi.draw();
    airPlane.draw();
    gunList.forEach((a, i, o) => {
        a.draw();
        a.y -= 8;
        if (a.y < 0) {
            o.splice(i, 1);
        }
    })
    if (timer % 120 === 0) {
        var enemy = new Enemy();
        enemyList.push(enemy);
    }
    enemyList.forEach((a, i, o) => {
        if (a.y > canvas.height) {
            o.splice(i, 1);
        }
        a.y++;
        crash(a, gunList);
        if (isGun == true) {
            o.splice(i, 1);
            console.log(1);
        }
        isGun = false;

        a.draw();
        crash1(a, airPlane);

    });
    ctx.lineWidth = 2;
    ctx.fillStyle = "#0ff";
    ctx.font = "50px cursive";
    ctx.fillText(`score:${score}`, 15, 65);
}
framePlay();
var isGun = false;

function crash(a, gunList) {
    gunList.forEach((g, i, o) => {
        var xDiff = a.x - g.x;
        var yDiff = (a.y + 70) - g.y;
        if ((yDiff > 0) && ((-70 < xDiff) && (xDiff < 10))) {
            o.splice(i, 1);
            isGun = true;
            score++;
        }
    })
}

function crash1(a, air) {
    var xDiff = a.x - air.x;
    var yDiff = (a.y + 70) - air.y;
    if ((yDiff > 0) && ((-70 < xDiff) && (xDiff < 10))) {
        cancelAnimationFrame(animation);
        end_sound.play();
        alert('GAME OVER!!!');
        location.reload();
    }

}
const arr_sound = [];
for (let i = 0; i < 10; i++) {
    const sound = new Audio();
    sound.src = "gun.mp3";
    arr_sound.push(sound);
}
const start_sound = new Audio();
start_sound.src = "start.mp3";
const end_sound = new Audio();
end_sound.src = "end.mp3";
var isStart = false;

document.addEventListener('keydown', function (e) {
    if (isStart == false) {
        start_sound.play();
    }
    isStart = true;
    if (e.code == 'ArrowRight') {
        airPlane.x += 12;
    } else if (e.code == 'ArrowLeft') {
        airPlane.x -= 12;
    } else if (e.code == 'Space') {
        var gun = new Gun();
        gunList.push(gun);
        for (let i = 0; i < arr_sound.length; i++) {
            if (arr_sound[i].paused) {
                arr_sound[i].play();
                break;
            }
        }
    }
    console.log(e.code);
});