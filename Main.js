var canvas = document.getElementById("mainCanvas");
var graphics = canvas.getContext("2d");
var planetList = [];

// tython = new Planet(200, 200, 10);
// naboo = new Planet(300, 300, 40);
// naboo.setVelocity(0.3, 0);
// tatooine = new Planet(600, 100, 20);
// var planetList = [tython, naboo, tatooine];
function randNum(min, max) {
    return Math.random() * (max - min) + min;
}

for (var i = 0; i < 1000; i++) {
    planetList.push(new Planet(randNum(0, 1080), randNum(0, 720), randNum(0.1, 11)));
}

// Fix the animation
function update() {
    for (var i = 0; i < planetList.length; i++) {
        planetList[i].move(planetList);
        
    }
    // graphics.clearRect(0,0, 1080, 720);
    graphics.beginPath();
    graphics.fillStyle = "#000000";
    graphics.fillRect(0, 0, 1080, 720);
    graphics.closePath();


    for (var i = 0; i < planetList.length; i++) {
        planetList[i].draw(graphics);

    }


    
    
}

setInterval(update, 50);




