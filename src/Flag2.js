class Flag2 {
    constructor() {
        this.x = 960;
        this.y = 460;
        this.r = 50;
        this.atrapado = false;
    }

    show() {
        image(redflag, this.x, this.y);
        /* fill(0);
        circle(this.x, this.y, this.r); */
    }

    crash(boat) {
        let d = dist(this.x, this.y, boat.x + 150, boat.y + 150);
        if (d < this.r + boat.r) {
            this.atrapado = true;
        } else {
            this.atrapado = false;
        }
        
        if (this.atrapado === true) {
            this.x = 200;
            this.y = 650;
            this.r = 50;
            console.log(boat.x, boat.y);
            redflag.resize(150, 0);
        } 
    }

}