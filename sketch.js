let counter = 0;
let FirstGameBoat = new Boat();
let FirstGameEnemy = new Enemy();
let FirstGameProyectiles = [];
let FirstGameProyectilesEnemy = [];
let obstaculos = [];
//let beach = new Beach();
let intro = new Intro();
let screenCounter = 0;
//Pantalla 0 = titulo
//Pantalla 1 = instrucciones
//Pantalla 2 = start;

function addCounter() {
  if (frameCount % 60 == 0) {
    counter++;
  }
}

//Carga de imagenes.
function preload() {
  img1U = loadImage('assets/1UP.gif');
  img1R = loadImage('assets/1RIGHT.gif');
  img1D = loadImage('assets/1DOWN.gif');
  img1L = loadImage('assets/1LEFT.gif');
  backGround = loadImage('assets/mar.gif');
  title = loadImage('assets/title.png');
  rocket = loadImage('assets/rocket.png');
  mainBoat = loadImage('assets/titleBoat.png');
  instructions = loadImage('assets/instrucciones.png');
  obstacle = loadImage('assets/obstacle.png');
}

function setup() {
  createCanvas(1280, 720);

  for (let j = 0; j < 3; j++) {
    obstaculos[j] = new Obstaculo(obstacle, j * 450 + 150, j * 250 + 100);
  }
}

function draw() {
  background(0, 153, 255);
  //Sea background
  image(backGround, 0, 0);

  //Contador
  textSize(48);
  addCounter();
  text(counter, 20, 50);

  switch (screenCounter) {
    //Introduccion
    case 0:
      intro.start(counter, rocket, title, mainBoat);
      break;
    //Instrucciones
    case 1:
      image(instructions, 0, 0);
      fill(255, 204, 0);
      strokeWeight(7);
      stroke(255);
      rect(550, 620, 200, 50, 50);
      noStroke();
      textSize(30);
      fill(255, 0, 0);
      text('Volver', 610, 655);
      fill(255);
      break;
    //Inicio del juego
    case 2:
      mainGame();
  }

}

//Funcion para cambio de pantalla
function mousePressed() {
  startDisplay();
  instructionsDisplay();
}

//Pasar de pantalla principal a instrucciones.
function instructionsDisplay() {
  if (screenCounter == 0 && mouseX > 500 && mouseX < 800 && mouseY > 500 && mouseY < 550) {
    screenCounter = 1;
    //Instrucciones
    console.log("undido instrucciones");
    console.log(screenCounter);
  }
}

//Pasar de pantalla principal a inicio del juego.
function startDisplay() {
  if (screenCounter == 0 && mouseX > 550 && mouseX < 750 && mouseY > 580 && mouseY < 630) {
    screenCounter = 2;
    //comenzar
    console.log("undido start");
  }

  //De instrucciones a menu principal
  if (screenCounter === 1 && mouseX > 550 && mouseX < 750 && mouseY > 620 && mouseY < 670) {
    screenCounter = 0;
    console.log("vuelta al menu principal");
  }
}

function mainGame() {
  /* beach.showObstacle(obstacle, 500, 500, 200, 200);
  beach.showObstacle(obstacle, 800, 100, 100, 100); */

  // Arreglos del proyectil del barco y sus funciones.
  for (let i = 0; i < FirstGameProyectiles.length; i++) {
    FirstGameProyectiles[i].show();
    FirstGameProyectiles[i].move(FirstGameBoat);
    for (var j = 0; j < obstaculos.length; j++) {
      if (FirstGameProyectiles[i].hits(obstaculos[j])) {
        FirstGameProyectiles[i].gone();
      }
    }
    if (FirstGameProyectiles[i].bye) {
      FirstGameProyectiles.splice(i, 1);
    }
  }

  //Arreglo de Barco chocando con Isla.

  for (var j = 0; j < obstaculos.length; j++) {
    obstaculos[j].show();
    if (FirstGameBoat.hits(obstaculos[j])) {
      FirstGameBoat.crash();
    }
  }
  // Arreglo del proyectil del enemigo y sus funciones.
  let lifePercentage = [];
  let lifeCounter = [];

  for (let e = 0; e < FirstGameProyectilesEnemy.length; e++) {
    FirstGameProyectilesEnemy[e].show();
    FirstGameProyectilesEnemy[e].move(FirstGameEnemy);

    if (FirstGameProyectilesEnemy[e].hits(FirstGameBoat)) {
      FirstGameProyectilesEnemy[e].gone();
    }
    if (FirstGameProyectilesEnemy[e].bye) {
      FirstGameProyectilesEnemy.splice(e, 1);
      console.log("crash");
    }

    let obj3 = new ProyectilEnemy(FirstGameEnemy.x, FirstGameEnemy.y);
    lifePercentage.push(obj3);
    console.log("arreglo de vidas: " + lifePercentage.length);
  }

  if (lifePercentage.length > 2) {
    fill(0);
    square(500, 500, 1000);
  }

  FirstGameBoat.show();
  FirstGameBoat.move();
  FirstGameEnemy.show();
  FirstGameEnemy.move();

}

//FirstGameBoat.crash(500, 500);
//FirstGameBoat.crash(800, 100);
/* console.log(mouseX, mouseY); */



function mouseClicked() {
  //Proyectil del barco:creación.
  let obj = new Proyectil(FirstGameBoat.x + 100, FirstGameBoat.y + 100, FirstGameBoat.mode);
  FirstGameProyectiles.push(obj);
  /* console.log(FirstGameProyectiles.length); */

  //Proyectil del enemigo:creación.
  let obj2 = new ProyectilEnemy(FirstGameEnemy.x, FirstGameEnemy.y);
  FirstGameProyectilesEnemy.push(obj2);
  /* console.log(FirstGameProyectilesEnemy.length); */
}



