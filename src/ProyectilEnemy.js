
function ProyectilEnemy(x, y) {
    this.x = x;
    this.y = y;
    this.r = 5;
    this.bye = false;

    this.show = function () {
        noStroke();
        fill(255, 0, 0);
        circle(this.x, this.y, this.r * 2);
    }

    this.move = function () {
        this.y = this.y + 2;
    }

    /* this.getX = function () { return this.x }
    this.getY = function () { return this.y} */

    this.hits = function (Boat) {
        let d = dist(this.x, this.y, Boat.x + 150, Boat.y + 150);
        if (d < this.r + Boat.r) {
            return true;
        } else {
            return false;
        }
    }
    this.hitsIsla = function (Obstaculo) {
        let d = dist(this.x, this.y, 550, 500);
        if (d < this.r + Obstaculo.r) {
            return true;
        } else {
            return false;
        }

    }
    this.hitsIsla1 = function (Obstaculo) {
        let d = dist(this.x, this.y, 150, 200);
        if (d < this.r + Obstaculo.r) {
            return true;
        } else {
            return false;
        }

    }
    this.hitsIsla2 = function (Obstaculo) {
        let d = dist(this.x, this.y, 900, 200);
        if (d < this.r + Obstaculo.r) {
            return true;
        } else {
            return false;
        }
    }
    this.gone = function () {
        this.bye = true;
    }
}
