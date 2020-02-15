var canvas = document.getElementById("mainCanvas");
var graphics = canvas.getContext("2d");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var generateWidth = 1080;
var generateHeight = 720;
var generateStartX = (canvasWidth / 2) - (generateWidth / 2);
var generateStartY = (canvasHeight / 2) - (generateHeight / 2);
var planetList = [];

// TODO --> Add reset button on screen
// TODO --> Click to spawn new planet
function reset() {
    planetList.splice(0, planetList.length);
}
// Func for generating random number --> For spawning planets
function randNum(min, max) {
    return Math.random() * (max - min) + min;
}
function setup() {
    for (var i = 0; i < 500; i++) {
        planetList.push(new Planet(randNum(0, canvasWidth), randNum(0, canvasHeight), randNum(0.1, 11)));
        // planetList.push(new Planet(randNum(generateStartX, generateWidth), randNum(generateStartY, generateHeight), randNum(0.1, 11)));
    }
}
// TODO --> Fix the animation
function update() {
    for (var i = 0; i < planetList.length; i++) {
        planetList[i].move(planetList);

        //Delete planets outside of canvas
        if (planetList[i].getPosition()[0] > canvasWidth) {
            planetList.splice(i, 1);
        }
        if (planetList[i].getPosition()[0] < 0) {
            planetList.splice(i, 1);
        }
        if (planetList[i].getPosition()[1] > canvasHeight) {
            planetList.splice(i, 1);
        }
        if (planetList[i].getPosition()[1] < 0) {
            planetList.splice(i, 1);
        }
        
    }
    graphics.beginPath();
    graphics.fillStyle = "#000000";
    graphics.fillRect(0, 0, canvasWidth, canvasHeight);
    graphics.closePath();


    for (var i = 0; i < planetList.length; i++) {
        planetList[i].draw(graphics);

    }
}

setInterval(update, 80);




