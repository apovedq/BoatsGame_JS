let counter = 0;
let FirstGameBoat = new Boat();
let SecondGameBoat = new Boat();
let FirstGameEnemy = new Enemy(1);
let SecondGameEnemy = new Enemy(2);
let FirstGameProyectiles = [];
let SecondGameProyectiles = [];
let FirstGameProyectilesEnemy = [];
let SecondGameProyectilesEnemy = [];
let obstaculos = [];
let intro = new Intro();
let screenCounter = 3;
let blueFlag = new BlueFlag();
let secondGame = new SecondGame();
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
  enemyBoat2 = loadImage('assets/enemyBoat2.png');
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
  winImage2 = loadImage('assets/ganasteDos.png');
  winImage = loadImage('assets/ganaste.png');
  wallImage = loadImage('assets/wallLevel2.png');
  
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
      break;
    case 3:
      secondLevel();
      break;
      
  }

}

//Funcion para cambio de pantalla
function mousePressed() {
  startDisplay();
  instructionsDisplay();
  goSecondLevel();
}

//Pasar de pantalla principal a instrucciones.
function instructionsDisplay() {
  if (screenCounter == 0 && mouseX > 500 && mouseX < 800 && mouseY > 500 && mouseY < 550) {
    screenCounter = 1;
    //Instrucciones
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
          //console.log(" vidas: " + boatLive);
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
  if (screenCounter === 2) {
    let obj = new Proyectil(FirstGameBoat.x + 100, FirstGameBoat.y + 100, FirstGameBoat.mode);
    FirstGameProyectiles.push(obj);
  }
  if (secondGameUserLife > 0) {
    if (screenCounter === 3) {
      let obj = new Proyectil(SecondGameBoat.x + 100, SecondGameBoat.y + 100, SecondGameBoat.mode);
      SecondGameProyectiles.push(obj);
    }
  }

  //pasar de pantalla 2 a 3 habiendo perdido en la 2.
  let secondGameloss = false;
  if (screenCounter === 2 && secondGameloss === true) {
    if (dist(mouseX, mouseY, 643, 446) < 100) {
      screenCounter = 3;
      secondGameloss = false;
    }
   }
    
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

  if (screenCounter === 3 && frameCount % 30 == 0 ) {
    let obj7 = new ProyectilEnemy(SecondGameEnemy.x + 30, SecondGameEnemy.y + 50);
    SecondGameProyectilesEnemy.push(obj7);
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

//Funcion para ir al siguiente nivel
function goSecondLevel() {
  if (dist(mouseX, mouseY, 640, 440) < 50 && firstGameCheck === true) {
    screenCounter++;
  }
}



let wallX = [];
    wallX.push(280);
    wallX.push(590-120);
    wallX.push(590-120);
    wallX.push(1120);
    wallX.push(1050 - 120);
    wallX.push(1050 - 120);
      let wallY = [];
    wallY.push(370);
    wallY.push(170-20);
    wallY.push(610-20);
    wallY.push(370);
    wallY.push(170 - 20);
wallY.push(600 - 20);
let secondGameUserLife = 4;
let secondGameEnemyLife = 4;
let secondGameCheck = false;
    
function secondLevel() {

  let lifebar = new lifeBar(SecondGameBoat.x, SecondGameBoat.y);
  let enemyLifeBar = new lifeBar(SecondGameEnemy.x-50, SecondGameEnemy.y-150);
  //Tirar proyectiles desde bote usuario.
  for (let i = 0; i < SecondGameProyectiles.length; i++) {
    SecondGameProyectiles[i].show();
    SecondGameProyectiles[i].moveSecondGame(SecondGameBoat);
  }
  
  //Tirar proyectiles desde bote enemigo.
  for (let e = 0; e < SecondGameProyectilesEnemy.length; e++) {
    SecondGameProyectilesEnemy[e].show();
    if (secondGameEnemyLife === 4) {
      SecondGameProyectilesEnemy[e].moveSecondGame(SecondGameEnemy.getSpeed() / 5);
      console.log(SecondGameEnemy.getSpeed());
    }

    if (secondGameEnemyLife === 3) {
      SecondGameEnemy.setSpeed(30);
      SecondGameProyectilesEnemy[e].moveSecondGame(SecondGameEnemy.getSpeed() / 2);
      console.log(SecondGameEnemy.getSpeed());
    }

    if (secondGameEnemyLife === 2) {
      
      SecondGameProyectilesEnemy[e].moveSecondGame(SecondGameEnemy.getSpeed());
      console.log(SecondGameEnemy.getSpeed());
    }

    //Balas del enemigo chocan con el note del usuario.
    if (SecondGameProyectilesEnemy[e].hitsSecondLevel(SecondGameBoat)) {
      SecondGameProyectilesEnemy[e].gone();
      secondGameUserLife--;
      //console.log(" vidas: " + boatLive);
    }

    if (SecondGameProyectilesEnemy[e].bye) {
      SecondGameProyectilesEnemy.splice(e, 1);
    }
  }

  for (let i = 0; i < SecondGameProyectilesEnemy.length; i++) {
//Misiles chocan contra paredes.
    for (var j = 0; j < wallX.length; j++) {
      shootWall(i, SecondGameProyectilesEnemy, wallX[j], wallY[j], 1);
    }
  }

  
  //Proyectiles de usuario chocan con paredes y contra enemigo.
  for (let i = 0; i < SecondGameProyectiles.length; i++) {

    if (dist(SecondGameProyectiles[i].x, SecondGameProyectiles[i].y, SecondGameEnemy.x, SecondGameEnemy.y - 30) < 100) {
      secondGameEnemyLife--;
      SecondGameProyectiles.splice(i, 1);
      console.log("choque con el enemigo");
    }

   for (var j = 0; j < wallX.length; j++) {
     shootWall(i, SecondGameProyectiles, wallX[j], wallY[j], 1)
      console.log("crash");
    }
 
  }
  if (screenCounter === 3) {
    secondLevelWalls();
    if (secondGameUserLife > 0) {
      SecondGameBoat.show();
      SecondGameBoat.move();
      SecondGameBoat.restriction();
      lifebar.show(lifeStatus4, lifeStatus3, lifeStatus2, lifeStatus1, secondGameUserLife);
    
    } else {
      SecondGameProyectiles = [];
      SecondGameProyectilesEnemy = [];
    }

    if (secondGameEnemyLife > 0) {
      SecondGameEnemy.show(enemyBoat2);
      SecondGameEnemy.secondLevelMove();
      enemyLifeBar.show(lifeStatus4, lifeStatus3, lifeStatus2, lifeStatus1, secondGameEnemyLife);
      enemyShoot();
    
    } else {
      SecondGameProyectilesEnemy = [];
      secondGameCheck = true;
    }
  }


  if (secondGameUserLife === 0) {
    screenCounter = 2;
    secondGameloss = true;
    console.log(screenCounter);
    FirstGameRestart();
    SecondLevelRestar();
  }

  
  
  if (secondGameCheck === true) {
    fill(255, 70);
    rect(winAnimationX + 430, winAnimationY + 480,430,700);
    noFill();
    image(winGif, winAnimationX , winAnimationY + 5)
    image(winImage2, winAnimationX, winAnimationY);
    winAnimationY-= 10;
    if (winAnimationY < 0) { winAnimationY = 0; }
  }

}
  
function SecondLevelRestar() {
  SecondGameProyectilesEnemy = [];
  SecondGameProyectiles = [];
  SecondGameBoat.setX(0);
  SecondGameBoat.setY(300);
  secondGameEnemyLife = 4;
  secondGameUserLife = 4;

}

  function secondLevelWalls() {


  
    createWall(wallImage, 400, 400);
    if (SecondGameBoat.crashWall(400 - 20, 400 - 10)) {
      SecondGameBoat.crash();
    }
  
    createWall(wallImage, 200, 200);
    if (SecondGameBoat.crashWall(580, 170)) {
      SecondGameBoat.crash();
    }

    createWall(wallImage, 400, 0);
    if (SecondGameBoat.crashWall(470 + 120, 570 + 40)) {
      SecondGameBoat.crash();
    }

    createWall(wallImage, 1150 - 300, 400);
    if (SecondGameBoat.crashWall(925 + 120, 570 + 40)) {
      SecondGameBoat.crash();
    }

    createWall(wallImage, 1150 - 100, 200, 50, 50);
    if (SecondGameBoat.crashWall(925 + 120, 150 + 40)) {
      SecondGameBoat.crash();
    }
 
    createWall(wallImage, 1150 - 300, 0);
    if (SecondGameBoat.crashWall(1120 + 120, 360 + 40)) {
      SecondGameBoat.crash();
    }
  }

  function createWall(img1, x, y) {
    image(img1, x, y,);
 
  }

function shootWall(i, array, wallX, wallY, number) {
  for (let i = 0; i < array.length; i++) {
    if (dist(array[i].x, array[i].y, wallX, wallY) < 100) {
      array.splice(i, 1);
    }
  }
}

  
    
  

