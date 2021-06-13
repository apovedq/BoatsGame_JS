
function Proyectil(x, y, dir) {
    this.x = x;
    this.y = y;
    this.r = 5;
    this.dir = dir;
    this.bye = false;

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

    this.moveSecondGame = function () {
        //this.x = this.x - 2;

        switch (dir) {
            case 0:
                this.x = this.x - 9;
                break;
            case 1:
                this.x = this.x + 9;
                break;
            case 2:
                this.y = this.y - 9;
                break;
            case 3:
                this.y = this.y + 9;
        }
    }
    this.hits = function (Obstaculo) {
        let d = dist(this.x, this.y, Obstaculo.x+150, Obstaculo.y+150);
        if (d < this.r + Obstaculo.r){
            return true;
        }else{
            return false;
        }
    }
    this.gone = function () {
        this.bye = true;
    }

    this.getX = function () { return this.x }
    this.getY = function () { return this.y }


}

