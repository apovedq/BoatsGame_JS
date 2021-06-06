
function Proyectil(x, y, dir) {
    this.x = x;
    this.y = y;
    this.r = 5;
    this.dir = dir;

    this.show = function () {
        noStroke();
        fill(0);
        circle(this.x, this.y, this.r * 2);
    }
    this.move = function () {
        //this.x = this.x - 2;

        switch (dir) {
            case 0:
                this.x = this.x - 2;
                break;
            case 1:
                this.x = this.x + 2;
                break;
            case 2:
                this.y = this.y - 2;
                break;
            case 3:
                this.y = this.y + 2;
        }
    }
}

