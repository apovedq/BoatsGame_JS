class Obstaculo {
    constructor(img, x, y) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.r = 125;
        /* this.height = height;
        this.width = width; */

        this.show = function () {
            //fill(220);
            //circle(this.x, this.y, this.r * 2);
            image(img, this.x, this.y);
        }
    }
}