function Enemy(number) {
    if (number == 1) {
        this.y = 0;
        this.x = 0;
        this.dir = true;
        this.advance = true;
    } else {
        this.y = 40;
        this.x = 1200;
        this.dir = true;
        this.advance = true;
    }
        /* this.y = 0;
        this.x = 0;
    this.dir = true;
    this.advance = true;*/
    

    this.show = function (boat) {
        
        /*if (this.x > 0) { this.x++; }
        if (this.x < 1280) { this.x--;}*/
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

    this.secondLevelMove = function () {
        
        
        this.velocidad = 15;
        if (this.y > 19 && this.y < 640 && this.x === 1200 || this.y > 49 && this.y < 640 && this.x === 1200 ) {
            this.y += this.velocidad;
        }
        if (this.y > 620 ) {
            this.x -= this.velocidad;
            if (this.x < 900) {
                this.x = this.x;
             }
        }
        if (this.x < 1000 && this.y > 50) {
            this.y -= this.velocidad;
        }
        if (this.x > 970 && this.y < 52 ) {
            this.x += this.velocidad;
         }

      

        
        /*if (this.dir === true) { this.x += 5; }
        else { this.x -= 5; }

        if (this.x < 10) {
            this.dir = true;
        }

        if (this.x > 1100) {
            this.dir = false;
        }*/
    }

    this.getX = function () { return this.x }
    this.getY = function () { return this.y }
    this.getSpeed = function () { return this.velocidad }
    this.setSpeed = function (speed) { this.velocidad = speed}
}
