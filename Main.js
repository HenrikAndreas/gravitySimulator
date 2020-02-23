var canvas = document.getElementById("mainCanvas");
var graphics = canvas.getContext("2d");
canvas.width = document.body.clientWidth * 0.8;
canvas.height = document.body.clientHeight * 0.8;
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var generateWidth = canvasWidth;
var generateHeight = canvasHeight;
var generateStartX = (canvasWidth / 2) - (generateWidth / 2);
var generateStartY = (canvasHeight / 2) - (generateHeight / 2);
var planetList = [];
var absorption = false;

function setAbsorption() {
    if (absorption == false) {
        absorption = true;
        return;
    }
    absorption = false;

}
// TODO --> De-accelerate planets that have absorbed
// TODO --> Spawn meteor
function reset() {
    planetList.splice(0, planetList.length);
}
// Func for generating random number --> For spawning planets
function randNum(min, max) {
    return Math.random() * (max - min) + min;
}
function setup() {
    if (absorption) {
        var planetNum = 500;
    } else {
        var planetNum = 1900;
    }
    for (var i = 0; i < planetNum; i++) {
        //planetList.push(new Planet(randNum(0, canvasWidth), randNum(0, canvasHeight), randNum(3, 17)));
        planetList.push(new Planet(randNum(generateStartX, generateWidth), randNum(generateStartY, generateHeight), randNum(3, 17)));
    }
}
// On buttonClick --> Add new planet
function addPlanet(event) {
    xPos = event.clientX;
    yPos = event.clientY;
    planetList.push(new Planet(xPos, yPos, randNum(1, 15)));

}

function update() {
    for (var i = 0; i < planetList.length; i++) {
        planetList[i].move(planetList);

        //Delete planets outside of canvas
        if (planetList[i].getPosition()[0] > canvasWidth + 500) {
            planetList.splice(i, 1);
        }
        if (planetList[i].getPosition()[0] < 0 - 500) {
            planetList.splice(i, 1);
        }
        if (planetList[i].getPosition()[1] > canvasHeight + 500)  {
            planetList.splice(i, 1);
        }
        if (planetList[i].getPosition()[1] < 0 - 500) {
            planetList.splice(i, 1);
        }

        // Absorbing lesser planets
        if (absorption == true) {
            if (planetList.length > 1) {
                var planets = planetList[i].getCollidingPlanets(planetList);
                for (var j = 0; j < planets.length; j++) {
                    var disposal = planetList.indexOf(planets[j]);
                    planetList[i].addMass(planets[j].getMass());
                    
                    //Decreasing velocity (based on mass) on impact
                    var velX = planetList[i].getVelocity()[0] / ((planets[j].getVelocity()[0] * planets[j].getMass()) / 2);
                    var velY = planetList[i].getVelocity()[1] / ((planets[j].getVelocity()[1] * planets[j].getMass())  / 2);
                    planetList[i].setVelocity(velX, velY);
                    

                    planetList.splice(disposal, 1);
                    
                }
            }
        }
    }

    render();

}

function render() {
    graphics.beginPath();
    graphics.fillStyle = "#000000";
    graphics.fillRect(0, 0, canvasWidth, canvasHeight);
    graphics.closePath();


    for (var i = 0; i < planetList.length; i++) {
        planetList[i].draw(graphics);

    }
}

setInterval(update, 40);


