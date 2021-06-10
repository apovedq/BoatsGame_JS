function Enemy() {
        this.y = 0;
        this.x = 0;
        this.dir = true;
    

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

    this.getX = function () { return this.x }
    this.getY = function () { return this.y }

    /* getX() { return this.x; }
    getY() { return this.y; } */
}
