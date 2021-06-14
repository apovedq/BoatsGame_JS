function raceBoat(x, y) {
    this.x = x;
    this.y = y;
    }
  

    this.show = function (boat) {
        
        image(boat, this.x-50, this.y-100);
    }

    this.move = function () {

        if (this.dir === true) { this.x += 5; }
        else { this.x -= 5; }

        if (this.x < 10) {
            this.dir = true;
        }

        if (this.x > 1100) {
            this.dir = false;
        }
    }

    this.getX = function () { return this.x }
    this.getY = function () { return this.y }
    this.getSpeed = function () { return this.velocidad }
    this.setSpeed = function (speed) { this.velocidad = speed}
