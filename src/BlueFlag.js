class BlueFlag {


    constructor() {
        this.x = 100;
        this.y = 100;
        this.r = 100;
        this.atrapado = false;
    }

    show() {
        fill(0);
        circle(this.x, this.y, this.r);
    }

    crash(boat) {
        let d = dist(this.x, this.y, boat.x + 150, boat.y + 150);
        if (d < this.r + boat.r) {
            this.atrapado = true;
        } else {
            this.atrapado = false;
        }
        
        if (this.atrapado === true) {
            this.x = 100;
            this.y = 600;
            this.r = 300;
            console.log(boat.x, boat.y);
        } 
    }

}