class Planet {

    constructor(xPos, yPos, mass) {
        this.mass = mass;
        this.position = [xPos, yPos];
        this.velocity = [0, 0];
        this.acceleration = [0, 0];
        this.maxVelocity = 15;
        this.radius = 1 + this.mass * 0.004; //Currently best sizes> 2 + this.mass * 0.0025
    }

    move(planetList) {
        for (var i = 0; i < planetList.length; i++) {
            if (planetList[i] != this) {
                var force = this.attract(planetList[i]);
                planetList[i].applyForce(force);
            }
        }
        // Handling maximum velocity
        if (this.velocity[0] > this.maxVelocity && this.velocity[0] > 0) {
            this.velocity[0] = this.maxVelocity;
        }
        if (this.velocity[0] < -this.maxVelocity && this.velocity[0] < 0) {
            this.velocity[0] = -this.maxVelocity;
        }
        if (this.velocity[1] > this.maxVelocity && this.velocity[1] > 0) {
            this.velocity[1] = this.maxVelocity;
        }
        if (this.velocity[1] < -this.maxVelocity && this.velocity[1] < 0) {
            this.velocity[1] = -this.maxVelocity;
        }

        this.velocity[0] += this.acceleration[0];
        this.velocity[1] += this.acceleration[1];

        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];

        this.acceleration[0] = 0;
        this.acceleration[1] = 0;
    }
    // Get list of planets to remove
    getCollidingPlanets(planetList) {
        var planets = []
        for (var i = 0; i < planetList.length; i++) {
            if (planetList[i] != this) {
                if (this.mass > planetList[i].getMass()) {
                    var xDistance = planetList[i].getPosition()[0] - this.position[0];
                    var yDistance = planetList[i].getPosition()[1] - this.position[1];
                    var distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
                    if (distance < this.radius + planetList[i].getRadius()) {
                        planets.push(planetList[i]);
                    }
                }
            }
        }
        return planets;
    }

    attract(planet) {
        var force = [(this.position[0] - planet.getPosition()[0]),
            (this.position[1] - planet.getPosition()[1])];
        //Distance between planets
        var distance = Math.sqrt(Math.pow(force[0], 2) + Math.pow(force[1], 2));
        
        if (distance > this.radius + planet.getRadius()) {
            // Vector magnitude
            force[0] = force[0] / distance;
            force[1] = force[1] / distance;

            var g = 1.5; //Gravitational constant --> Modified value
            var strength = (g * (this.mass * planet.getMass()) / Math.pow(distance, 2)); //Formula for gravitational pull
            
            // Vector that implies the gravitational force between bodies
            force[0] = force[0] * strength;
            force[1] = force[1] * strength;
            
        } else {
            force[0] = 0;
            force[1] = 0;
        }
        return force;
    }

    collision(planet) {
        var force = [(this.position[0] - planet.getPosition()[0]),
            (this.position[1] - planet.getPosition()[1])];
        var distance = Math.sqrt(Math.pow(force[0], 2) + Math.pow(force[1], 2));
        // Magnitude
        force[0] = force[0] / distance;
        force[1] = force[1] / distance;
        // Strength
        force[0] = force[0] * planet.getMass() * planet.getAcceleration()[0] * 10;
        force[1] = force[1] * planet.getMass() * planet.getAcceleration()[1] * 10;
        return force;

    }

    applyForce(force) {
        //Newtons second law = F=ma --> a=F/m
        var actualForce = [force[0] / this.mass, force[1] / this.mass]
        this.acceleration[0] += actualForce[0];
        this.acceleration[1] += actualForce[1];
    }

    draw(graphics) {
        graphics.beginPath();
        graphics.arc(this.getPosition()[0], this.getPosition()[1], this.radius, 0, 2* Math.PI);
        graphics.fillStyle = "#8ab2f2";
        graphics.fill();
        graphics.closePath();


    }
    getRadius() {
        return this.radius;
    }
    addMass(mass) {
        this.mass += mass;
        this.radius = 1 + this.mass * 0.004;
    }
    getMass() {
        return this.mass;
    }
    getAcceleration() {
        return this.acceleration;
    }
    getPosition() {
        return this.position;
    }
    getVelocity() {
        return this.velocity;
    }
    setVelocity(xVel, yVel) {
        this.velocity[0] = xVel;
        this.velocity[1] = yVel;
    }
    setAcceleration(xAcc, yAcc) {
        this.acceleration[0] = xAcc;
        this.acceleration[1] = yAcc;
    }

}