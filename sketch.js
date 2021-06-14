let counter = 0;
let FirstGameBoat = new Boat(0, 450, 2);
let CaminoGameBoat = new Boat(125, 80, 1);
let FlagBoat = new Boat(0, 450, 2);
let SecondGameBoat = new Boat(0, 450, 2);
let FirstGameEnemy = new Enemy(1);
let SecondGameEnemy = new Enemy(2);
let ThirdGameEnemy = new Enemy(3);
let CaminoGameEnemy = new Enemy(4);
let CaminoGameEnemy2 = new Enemy(4);
let FirstGameProyectiles = [];
let SecondGameProyectiles = [];
let ThirdGameProyectiles = [];
let CaminoGameProyectiles = [];
let FirstGameProyectilesEnemy = [];
let SecondGameProyectilesEnemy = [];
let ThirdGameProyectilesEnemy = [];
let CaminoGameProyectilesEnemy = [];
let CaminoGameProyectilesEnemy2 = [];
let obstaculos = [];
let obstaculos2 = [];
let intro = new Intro();

let screenCounter = 4;

let greenFlag = new Flag();
let redFlag = new Flag2();
let secondGame = new SecondGame();
let boatLive = 4;
let enemyLive = 4;
let boatLive2 = 4;
let enemyLive2 = 4;
let firstGameCheck = false;
let thirdGameCheck = false;
let thirdGameUserLife = 4;
let thirdGameEnemyLife = 4;
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
  caminoBackground = loadImage('assets/escenario.png');
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
  redflag = loadImage('assets/REDFLAG.png');
  greenflag = loadImage('assets/GREENFLAG.png');
  wallImage = loadImage('assets/wallLevel2.png');
  caminoImg = loadImage('assets/2DOWN.gif');
  greenEnemyBoat = loadImage('assets/enemygreen.png');

}

function setup() {
  createCanvas(1280, 720);

  for (let j = 0; j < 3; j++) {
    obstaculos[j] = new Obstaculo(obstacle, j * 400 + 150, j * 300 + 200);
    if (j > 1) { obstaculos[2] = new Obstaculo(obstacle, 900, 200); }
  }
  for (let j = 0; j < 3; j++) {
    obstaculos2[j] = new Obstaculo(obstacle, j * 400 + 150, j * 300 + 200);
    if (j > 1) { obstaculos2[2] = new Obstaculo(obstacle, 900, 200); }
  }

  finalLine = function () { image(firstGameFinalLine, 1200, 0); }
}

function draw() {
  background(0, 153, 255);
  //Sea background
  imageMode(CORNER);
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
      instructionsDisplay(instructions);
      break;
    //Inicio del juego
    case 2:
      mainGame();
      break;
    case 3:
      secondLevel();
      break;
    case 4:
      captureTheFlag();
      break;
    case 5:
      caminoGame();

  }
}

function instructionsDisplay(instructions) {
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
};

//Funcion para cambio de pantalla
function mousePressed() {
  startDisplay();
  instructionsDisplay();
  goSecondLevel();
  goThirdLevel();
  goFourthLevel();
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

  if (screenCounter === 2) {
    finalLine();
    firstGameWin(FirstGameBoat.x, 1200);
    if (boatLive != 0) {
      let lifebar = new lifeBar(FirstGameBoat.x, FirstGameBoat.y);
      let enemyLifebar = new lifeBar(FirstGameEnemy.getX() - 50, FirstGameEnemy.getY() - 100);
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
      if (firstGameCheck === false && screenCounter === 2) {
        for (let i = 0; i < FirstGameProyectiles.length; i++) {
          FirstGameProyectiles[i].show();
          FirstGameProyectiles[i].move(FirstGameBoat);
          for (var j = 0; j < obstaculos.length; j++) {
            if (FirstGameProyectiles[i].hits(obstaculos[j]) || FirstGameProyectiles[i].hits2(obstaculos[j]) || FirstGameProyectiles[i].hits3(obstaculos[j])) {
              FirstGameProyectiles[i].gone();
            }

            if (dist(FirstGameProyectiles[i].x, FirstGameProyectiles[i].y, FirstGameEnemy.x, FirstGameEnemy.y) < 100) {
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
        imageMode(CENTER);
        obstaculos[j].show();
        if (FirstGameBoat.hits(obstaculos[j]) || FirstGameBoat.hits2(obstaculos[j]) || FirstGameBoat.hits3(obstaculos[j])) {
          console.log("crash")
          FirstGameBoat.crash();
        }
      }
      // Arreglo del proyectil del enemigo y sus funciones.

      if (firstGameCheck === false && screenCounter === 2) {
        for (let e = 0; e < FirstGameProyectilesEnemy.length; e++) {
          FirstGameProyectilesEnemy[e].show();
          FirstGameProyectilesEnemy[e].move(FirstGameEnemy);

          if (FirstGameProyectilesEnemy[e].hits(FirstGameBoat)) {
            FirstGameProyectilesEnemy[e].gone();
            if (boatLive > 0) {
              boatLive--;
            }

          }
          if (FirstGameProyectilesEnemy[e].bye) {
            FirstGameProyectilesEnemy.splice(e, 1);
          }
        }
      } else { }


    } else {
      FirstGameRestart();
    }

    //Win animation
    if (firstGameCheck === true && screenCounter == 2) {
      fill(255, 70);
      rect(winAnimationX + 430, winAnimationY + 480, 430, 700);
      noFill();
      imageMode(CORNER);
      image(winGif, winAnimationX, winAnimationY + 5)
      image(winImage, winAnimationX, winAnimationY);
      winAnimationY -= 10;
      if (winAnimationY < 0) { winAnimationY = 0; }
    }

  }
}
function captureTheFlag() {
  if (screenCounter === 4) {
    finalLine();
    ThirdGameWin(FlagBoat.x, 1200);
    if (boatLive != 0) {
      let lifebar = new lifeBar(FlagBoat.x, FlagBoat.y);
      let enemyLifebar = new lifeBar(ThirdGameEnemy.getX() - 50, ThirdGameEnemy.getY() - 100);
      lifebar.show(lifeStatus4, lifeStatus3, lifeStatus2, lifeStatus1, boatLive);
      FlagBoat.show();
      if (thirdGameCheck === false) {
        FlagBoat.restriction();
      } else {
        FlagBoat.setX(5000);
      }
      FlagBoat.move();
      if (enemyLive2 != 0) {
        ThirdGameEnemy.show(greenEnemyBoat);
        ThirdGameEnemy.move();
        enemyShoot();
        enemyLifebar.show(lifeStatus4, lifeStatus3, lifeStatus2, lifeStatus1, enemyLive);

      }
      // Arreglos del proyectil del barco y sus funciones.
      if (thirdGameCheck === false) {
        for (let i = 0; i < ThirdGameProyectiles.length; i++) {
          ThirdGameProyectiles[i].show();
          ThirdGameProyectiles[i].move(FlagBoat);
          for (var j = 0; j < obstaculos.length; j++) {
            if (ThirdGameProyectiles[i].hits(obstaculos2[j]) || ThirdGameProyectiles[i].hits2(obstaculos2[j]) || ThirdGameProyectiles[i].hits3(obstaculos2[j])) {
              ThirdGameProyectiles[i].gone();
            }

            if (dist(ThirdGameProyectiles[i].x, ThirdGameProyectiles[i].y, ThirdGameEnemy.x, ThirdGameEnemy.y) < 100) {
              if (enemyLive > 0) {
                enemyLive--;
                console.log(enemyLive)
                ThirdGameProyectiles.splice(i, 1);
              }
            }

          }

          if (ThirdGameProyectiles[i].bye) {
            ThirdGameProyectiles.splice(i, 1);
          }
        }
      } else { }

      //Arreglo de Barco chocando con Isla.

      for (var j = 0; j < obstaculos.length; j++) {
        imageMode(CENTER);
        obstaculos2[j].show();
        if (FlagBoat.hits(obstaculos2[j]) || FlagBoat.hits2(obstaculos2[j]) || FlagBoat.hits3(obstaculos2[j])) {
          console.log("crash")
          FlagBoat.crash();
        }
      }
      // Arreglo del proyectil del enemigo y sus funciones.

      if (firstGameCheck === false) {
        for (let e = 0; e < ThirdGameProyectilesEnemy.length; e++) {
          ThirdGameProyectilesEnemy[e].show();
          ThirdGameProyectilesEnemy[e].move(ThirdGameEnemy);

          if (ThirdGameProyectilesEnemy[e].hits(FlagBoat)) {
            ThirdGameProyectilesEnemy[e].gone();
            if (boatLive > 0) {
              boatLive--;
            }
            //console.log(" vidas: " + boatLive);
          }
          if (ThirdGameProyectilesEnemy[e].bye) {
            ThirdGameProyectilesEnemy.splice(e, 1);
          }
        }
      } else { }

      greenFlag.show();//Llamar bandera
      greenFlag.crash(FlagBoat);//Chocar con bandera
      redFlag.show();//Llamar bandera
      redFlag.crash(FlagBoat);//Chocar con bandera
    } else {
      FirstGameRestart();
    }
  }
  if (thirdGameCheck === true && screenCounter == 4) {
    fill(255, 70);
    rect(winAnimationX + 430, winAnimationY + 480, 430, 700);
    noFill();
    imageMode(CORNER);
    image(winGif, winAnimationX, winAnimationY + 5)
    image(winImage, winAnimationX, winAnimationY);
    winAnimationY -= 10;
    if (winAnimationY < 0) { winAnimationY = 0; }
  }

}
//Funcion disparo usuario.
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
  if (thirdGameUserLife > 0) {
    if (screenCounter === 4) {
      let obj = new Proyectil(FlagBoat.x + 100, FlagBoat.y + 100, FlagBoat.mode);
      ThirdGameProyectiles.push(obj);
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

  if (screenCounter === 5) {
    let obj = new Proyectil(CaminoGameBoat.x, CaminoGameBoat.y, CaminoGameBoat.mode);
    CaminoGameProyectiles.push(obj);
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

  if (screenCounter === 1 && FirstGameEnemy.x > 400 && FirstGameEnemy.x < 700 && FirstGameEnemy.x % 60 == 0) {
    let obj2 = new ProyectilEnemy(FirstGameEnemy.x + 30, FirstGameEnemy.y + 50);
    FirstGameProyectilesEnemy.push(obj2);
  }

  if (screenCounter === 3 && frameCount % 30 == 0) {
    let obj7 = new ProyectilEnemy(SecondGameEnemy.x + 30, SecondGameEnemy.y + 50);
    SecondGameProyectilesEnemy.push(obj7);
  }
  if (screenCounter === 4 && ThirdGameEnemy.x > 400 && ThirdGameEnemy.x < 700 && ThirdGameEnemy.x % 30 == 0) {
    let obj2 = new ProyectilEnemy(ThirdGameEnemy.x + 30, ThirdGameEnemy.y + 50, 6);
    ThirdGameProyectilesEnemy.push(obj2);
  }

  if (screenCounter === 5 && frameCount % 137 == 0) {
    let obj9 = new ProyectilEnemy(CaminoGameEnemy.x + 30, CaminoGameEnemy.y + 50);
    CaminoGameProyectilesEnemy.push(obj9);
  }

  if (screenCounter === 5 && frameCount % 77 == 0) {
    let obj10 = new ProyectilEnemy(610, 570);
    CaminoGameProyectilesEnemy2.push(obj10);
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

//funcion para ganar en primer juego
function firstGameWin(x1, x2) {
  if (x1 > x2) {
    firstGameCheck = true;
    return x1 = 1000;
  }
}
function ThirdGameWin(x1, x2) {
  if (x1 > x2) {
    thirdGameCheck = true;
    return x1 = 1000;
  }
}
//Funcion para ir al siguiente nivel
function goSecondLevel() {
  if (dist(mouseX, mouseY, 640, 440) < 50 && firstGameCheck === true) {
    screenCounter++;
    firstGameCheck = false;
  }
}

//Funcion para ir al siguiente nivel.
function goThirdLevel() {
  if (dist(mouseX, mouseY, 640, 440) < 50 && screenCounter === 3 && secondGameCheck === true) {
    screenCounter = 4;
    secondGameCheck = false;
  }
}
function goFourthLevel() {
  if (dist(mouseX, mouseY, 640, 440) < 50 && screenCounter === 4 && ThirdGamewin === true) {
    screenCounter = 5;
    ThirdGameCheck = false;
  }
}



let wallX = [];
wallX.push(280);
wallX.push(590 - 120);
wallX.push(590 - 120);
wallX.push(1120);
wallX.push(1050 - 120);
wallX.push(1050 - 120);
let wallY = [];
wallY.push(370);
wallY.push(170 - 20);
wallY.push(610 - 20);
wallY.push(370);
wallY.push(170 - 20);
wallY.push(600 - 20);
let secondGameUserLife = 4;
let secondGameEnemyLife = 4;
let secondGameCheck = false;

//Display funcionamiento segundo nivel.
function secondLevel() {

  let lifebar = new lifeBar(SecondGameBoat.x, SecondGameBoat.y);
  let enemyLifeBar = new lifeBar(SecondGameEnemy.x - 50, SecondGameEnemy.y - 150);
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
      /* SecondGameProyectiles = [];
      SecondGameProyectilesEnemy = []; */
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
    FirstGameRestart();
    SecondLevelRestar();
  }



  if (secondGameCheck === true) {
    fill(255, 70);
    rect(winAnimationX + 430, winAnimationY + 480, 430, 700);
    noFill();
    image(winGif, winAnimationX, winAnimationY + 5)
    image(winImage2, winAnimationX, winAnimationY);
    winAnimationY -= 10;
    if (winAnimationY < 0) { winAnimationY = 0; }
  }

}

//Volver a empezar el juego 2
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



let CaminoGameUserLife = 4;
let CaminoGameEnemyLife = 4;
let CaminoGameCheck = false;

function caminoGame() {


  followThePath();



  image(caminoBackground, 0, 0);
  if (screenCounter === 5) {
    CaminoGameEnemy.show(caminoImg);
    CaminoGameEnemy.CaminoLevelMove();

    enemyShoot();

    if (CaminoGameCheck === false) {
      //Dispara barco enemigo.
      for (let e = 0; e < CaminoGameProyectilesEnemy.length; e++) {
        CaminoGameProyectilesEnemy[e].show();
        CaminoGameProyectilesEnemy[e].move();

        if (CaminoGameProyectilesEnemy[e].y > 650) {
          CaminoGameProyectilesEnemy.splice(e, 1);
        }

        if (CaminoGameProyectilesEnemy[e].hitsCamino(CaminoGameBoat)) {
          CaminoGameUserLife--;
          CaminoGameProyectilesEnemy.splice(e, 1);
        }
      }

      //Dispara cañon negro 
      for (let e = 0; e < CaminoGameProyectilesEnemy2.length; e++) {
        CaminoGameProyectilesEnemy2[e].showCanion();

        if (CaminoGameProyectilesEnemy2[e].y < 0) {
          CaminoGameProyectilesEnemy2.splice(e, 1);
        }

        if (CaminoGameProyectilesEnemy2[e].hitsCamino(CaminoGameBoat)) {
          CaminoGameUserLife -= 2;
          CaminoGameProyectilesEnemy2.splice(e, 1);
        }
      }
    } else { }




    let lifebar = new lifeBar(CaminoGameBoat.x - 20, CaminoGameBoat.y - 50);
    imageMode(CENTER);
    lifebar.show(lifeStatus4, lifeStatus3, lifeStatus2, lifeStatus1, CaminoGameUserLife);

    CaminoGameBoat.show();
    if (firstGameCheck === false) {
      CaminoGameBoat.restriction();
    } else {
      CaminoGameBoat.setX(5000);
    }
    if (CaminoGameCheck === false) {
      CaminoGameBoat.move();
    } else { CaminoGameBoat.y++; }

    console.log(mouseX, mouseY)
    if (CaminoGameBoat.x > 1000 && CaminoGameBoat.y > 400) {
      CaminoGameCheck = true;
      console.log("haz llegado");
    }

    if (CaminoGameUserLife === 0) {
      CaminoGameBoat.setX(125);
      CaminoGameBoat.setY(80);
      CaminoGameUserLife = 4;
    }

    /*for (let i = 0; i < CaminoGameProyectiles.length; i++) {
      CaminoGameProyectiles[i].show();
      CaminoGameProyectiles[i].move(CaminoGameBoat);
    }*/
    //Limites del camino ladrillos.
  }
}


function followThePath() {

  if (CaminoGameBoat.x < 125) {
    CaminoGameBoat.crash2();
  }
  if (CaminoGameBoat.x > 140 && CaminoGameBoat.x < 360 && CaminoGameBoat.y > 0 && CaminoGameBoat.y < 500) {
    CaminoGameBoat.crash2();
  }
  if (CaminoGameBoat.x > 400 && CaminoGameBoat.x < 610 && CaminoGameBoat.y > 0 && CaminoGameBoat.y < 352) {
    CaminoGameBoat.crash2();
  }
  if (CaminoGameBoat.x > 600 && CaminoGameBoat.x < 840 && CaminoGameBoat.y > 0 && CaminoGameBoat.y < 352) {
    CaminoGameBoat.crash2();
  }
  if (CaminoGameBoat.x > 70 && CaminoGameBoat.x < 480 && CaminoGameBoat.y > 570 && CaminoGameBoat.y < 700) {
    CaminoGameBoat.crash2();
  }
  if (CaminoGameBoat.x > 430 && CaminoGameBoat.x < 560 && CaminoGameBoat.y > 380 && CaminoGameBoat.y < 700) {
    CaminoGameBoat.crash2();
  }
  if (CaminoGameBoat.x > 600 && CaminoGameBoat.x < 1080 && CaminoGameBoat.y > 380 && CaminoGameBoat.y < 700) {
    CaminoGameBoat.crash2();
  }
  if (CaminoGameBoat.x > 880 && CaminoGameBoat.x < 1080 && CaminoGameBoat.y > 100 && CaminoGameBoat.y < 700) {
    CaminoGameBoat.crash2();
  }
  if (CaminoGameBoat.x > 1140 && CaminoGameBoat.x < 1200 && CaminoGameBoat.y > 0 && CaminoGameBoat.y < 500) {
    CaminoGameBoat.crash2();
  }
}





