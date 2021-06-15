
function ProyectilEnemy(x, y) {
    this.x = x;
    this.y = y;
    this.r = 5;
    this.bye = false;

    this.show = function () {
        circle(this.x, this.y, 5);
    }

    this.move = function () {
        noStroke();
        fill(255, 0, 0);
        circle(this.x, this.y, this.r * 2);
        this.y = this.y + 2;
    }

    this.showCanion = function () {
        noStroke();
        fill(0);
        circle(this.x, this.y, this.r * 5);
        this.y = this.y - 3;
    }

    this.moveCaninon = function () {
        this.y = this.y - 3;
    }

    this.moveSecondGame = function (velocidad) {
        this.x = this.x - velocidad;
    }

    /* this.getX = function () { return this.x }
    this.getY = function () { return this.y} */

    this.hits = function (Boat) {
        let d = dist(this.x, this.y, Boat.x + 150, Boat.y + 150);
        if (d < this.r + Boat.r){
            return true;
        } else {
            return false;
        }
    }

    this.hitsCamino = function (Boat) {
        let d = dist(this.x, this.y, Boat.x, Boat.y );
        if (d < 50){
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

    this.hitsSecondLevel = function (Boat) {
        let d = dist(this.x , this.y, Boat.x+100 , Boat.y +100 );
        if (d < this.r + Boat.r + 40){
            return true;
        }else{
            return false;
        }
    }



    this.gone = function () {
        this.bye = true;
    }

    this.wallHits = function (wallX, wallY) {
        let d = dist(this.x, this.y, wallX, wallY);
        if (d < this.r + 100){
            return true;
        }else{
            return false;
        }
    }

}
