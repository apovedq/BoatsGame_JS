function Enemy() {
        this.y = 0;
        this.x = 0;
        this.dir = true;
    

    this.show = function () {
        /*if (this.x > 0) { this.x++; }
        if (this.x < 1280) { this.x--;}*/
        circle(this.x, this.y, 100);
    }

    this.move = function () {

        if (this.dir === true) { this.x += 5; }
        else { this.x -= 5; }

        if (this.x < 10) {
            this.dir = true;
        }

        if (this.x > 1280) {
            this.dir = false;
        }
    }

    /* getX() { return this.x; }
    getY() { return this.y; } */
}
