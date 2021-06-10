let counter = 0;
let FirstGameBoat = new Boat();
let FirstGameEnemy = new Enemy();
let FirstGameProyectiles = [];
let FirstGameProyectilesEnemy = [];
let obstaculos = [];
let intro = new Intro();
let screenCounter = 0;
let blueFlag = new BlueFlag();
let boatLive = 4;
let enemyLive = 4;
let firstGameCheck = false;
let = winAnimationX = 0;
let = winAnimationY = 300;

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
  lifeStatus4 = loadImage('assets/lifeStatus1.png');
  lifeStatus3 = loadImage('assets/lifeStatus4.png');
  lifeStatus2 = loadImage('assets/lifeStatus3.png');
  lifeStatus1 = loadImage('assets/lifeStatus2.png');
  redEnemyBoat = loadImage('assets/enemyBoat.png');
  firstGameFinalLine = loadImage('assets/finalline.png');
  winGif = loadImage('assets/ganasteAnimacion.gif');
  winImage = loadImage('assets/ganaste.png');
  
}

function setup() {
  createCanvas(1280, 720);

  for (let j = 0; j < 3; j++) {
    obstaculos[j] = new Obstaculo(obstacle, j * 450 + 20, j * 250 + 100);
    if (j>1) {obstaculos[2] = new Obstaculo(obstacle, 900, 100); }
  }

  finalLine = function () {image(firstGameFinalLine, 1200, 0);}
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

//Funcion para ejecutar primer juego
function mainGame() {
  
  finalLine();
  firstGameWin(FirstGameBoat.x, 1200);
  if (boatLive != 0) {
    let lifebar = new lifeBar(FirstGameBoat.x, FirstGameBoat.y);
    let enemyLifebar = new lifeBar(FirstGameEnemy.getX()-50, FirstGameEnemy.getY()-100);
    lifebar.show(lifeStatus4, lifeStatus3, lifeStatus2, lifeStatus1, boatLive);
    FirstGameBoat.show();
    if (firstGameCheck === false) {
      FirstGameBoat.restriction();
    } else {
      FirstGameBoat.setX(5000);
    }
    FirstGameBoat.move();
    if (enemyLive != 0) {
      FirstGameEnemy.show(redEnemyBoat);
      FirstGameEnemy.move();
      enemyShoot();
      enemyLifebar.show(lifeStatus4, lifeStatus3, lifeStatus2, lifeStatus1, enemyLive);

    }
  // Arreglos del proyectil del barco y sus funciones.
    if (firstGameCheck === false) {
      for (let i = 0; i < FirstGameProyectiles.length; i++) {
        FirstGameProyectiles[i].show();
        FirstGameProyectiles[i].move(FirstGameBoat);
        for (var j = 0; j < obstaculos.length; j++) {
          if (FirstGameProyectiles[i].hits(obstaculos[j])) {
            FirstGameProyectiles[i].gone();
          }

          if (dist(FirstGameProyectiles[i].x, FirstGameProyectiles[i].y, FirstGameEnemy.x, FirstGameEnemy.y)<100) {
            if (enemyLive > 0) {
              enemyLive--;
              console.log(enemyLive)
              FirstGameProyectiles.splice(i, 1);
              }
          }

        }
        
        if (FirstGameProyectiles[i].bye) {
          FirstGameProyectiles.splice(i, 1);
        }
      }
    } else { }

  //Arreglo de Barco chocando con Isla.

  for (var j = 0; j < obstaculos.length; j++) {
    obstaculos[j].show();
    if (FirstGameBoat.hits(obstaculos[j])) {
      FirstGameBoat.crash();
    }
  }
  // Arreglo del proyectil del enemigo y sus funciones.

    if (firstGameCheck === false) {
      for (let e = 0; e < FirstGameProyectilesEnemy.length; e++) {
        FirstGameProyectilesEnemy[e].show();
        FirstGameProyectilesEnemy[e].move(FirstGameEnemy);

        if (FirstGameProyectilesEnemy[e].hits(FirstGameBoat)) {
          FirstGameProyectilesEnemy[e].gone();
          if (boatLive > 0) {
            boatLive--;
          }
          console.log(" vidas: " + boatLive);
        }
        if (FirstGameProyectilesEnemy[e].bye) {
          FirstGameProyectilesEnemy.splice(e, 1);
        }
      }
    } else { }
 
  //blueFlag.show();//Llamar bandera
 // blueFlag.crash(FirstGameBoat);//Chocar con bandera
  } else {
    FirstGameRestart();
  }

   //Win animation
  if (firstGameCheck === true) {
    fill(255, 70);
    rect(winAnimationX + 430, winAnimationY + 480,430,700);
    noFill();
    image(winGif, winAnimationX , winAnimationY + 5)
    image(winImage, winAnimationX, winAnimationY);
    winAnimationY-= 10;
    if (winAnimationY < 0) { winAnimationY = 0; }
   }

}

//Funcion Mouse Clicked.
function mouseClicked() {
  //Proyectil del barco:creación.
  let obj = new Proyectil(FirstGameBoat.x + 100, FirstGameBoat.y + 100, FirstGameBoat.mode);
  FirstGameProyectiles.push(obj);
}

//Enemigo dispara.
function enemyShoot() {
  if (screenCounter === 2 && FirstGameEnemy.x > 700 && FirstGameEnemy.x % 120 == 0) {
    let obj2 = new ProyectilEnemy(FirstGameEnemy.x + 30, FirstGameEnemy.y + 50);
    FirstGameProyectilesEnemy.push(obj2);
  }

  if (screenCounter === 2 && FirstGameEnemy.x < 400 && FirstGameEnemy.x % 120 == 0) {
    let obj2 = new ProyectilEnemy(FirstGameEnemy.x + 30, FirstGameEnemy.y + 50);
    FirstGameProyectilesEnemy.push(obj2);
  }

  if (screenCounter === 2 && FirstGameEnemy.x > 400 && FirstGameEnemy.x < 700 && FirstGameEnemy.x % 60 == 0) {
    let obj2 = new ProyectilEnemy(FirstGameEnemy.x + 30, FirstGameEnemy.y + 50);
    FirstGameProyectilesEnemy.push(obj2);
  }
  
}

//Resetear el primero juego.
function FirstGameRestart() {
  boatLive = 4;
  enemyLive = 4;
    console.log("restart");
    FirstGameBoat.crash();
    FirstGameProyectiles = [];
    FirstGameProyectilesEnemy = [];
}

function firstGameWin(x1,x2) {
  if (x1 > x2)
  {
    firstGameCheck = true;
    return x1 = 1000;
  } 
}
