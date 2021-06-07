
function ProyectilEnemy(x, y) {
    this.x = x;
    this.y = y;
    this.r = 5;

    this.show = function () {
        noStroke();
        fill(255,0,0);
        circle(this.x, this.y, this.r * 2);
    }

    this.move = function () {
        this.y = this.y + 2;
    }

    this.getX = function () { return this.x }
    this.getY = function () { return this.y}
    

}