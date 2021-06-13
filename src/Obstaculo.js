class Obstaculo {
    constructor(img, x, y) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.r = 135;
        /* this.height = height;
        this.width = width; */

        this.show = function () {
            /* ellipseMode(CENTER); */
            /* fill(220);
            circle(this.x, this.y, this.r * 2); */
            /* imageMode(CENTER); */
            image(img, this.x, this.y);
        }
    }
}