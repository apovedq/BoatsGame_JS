preload = function () {
  img1U = loadImage('assets/1UP.gif');
  img1R = loadImage('assets/1RIGHT.gif');
  img1D = loadImage('assets/1DOWN.gif');
  img1L = loadImage('assets/1LEFT.gif');
}
  let proyectiles = [];
  let boat;

  function setup() {
    createCanvas(1280, 720);
    boat = new Boat();
  }
    function draw() {
      background(220)
      for (var i = 0; i < proyectiles.length; i++) {
        proyectiles[i].show();
        proyectiles[i].move(boat);
      }
      boat.show();
      boat.move();
    }
    function mouseClicked() {
      let obj = new Proyectil(boat.x + 100, boat.y + 100, boat.mode);
      proyectiles.push(obj);
    }
  


