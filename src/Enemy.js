class Enemy {
    constructor(y,x) {
        this.y = y;
        this.x = x;
        this.dir = true;
    }
    
    display() {
        /*if (this.x > 0) { this.x++; }
        if (this.x < 1280) { this.x--;}*/
        circle(this.x, this.y, 100);
    }
    
    move() {

        if (this.dir === true)
        { this.x += 15; }
        else
        { this.x -= 15; }

        if (this.x < 10) {
            this.dir = true;
        }
        
        if (this.x > 1280) {
            this.dir = false;
         }
    }
    
    getX() { return this.x; }
    getY() { return this.y;}
}
