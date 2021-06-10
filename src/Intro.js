class Intro {

    constructor() {
        this.xRocket = -120;
        this.yRocket = -120;
        this.x = 0;
        this.winAnimationX = 1280 / 2;
        this.winAnimationY = 100;

    }

    display(counter, rocket, title, boat) {
        if (this.x < 500){this.x += 10;}
        fill(0, 70);
        noStroke();
        ellipse(615, 240, 200, 50);
        image(boat, this.x,0, 250, 250);
        image(title, 0, 0); 
        if (counter > 1) {
          image(rocket, this.xRocket, this.yRocket);
          //Rocket movement at intro 
          if (counter > 1 && counter < 5) {
          this.xRocket+= 5;
          this.yRocket+= 5;
            }
        }
    }
    
    buttonsDisplay(counter) {        
        if (counter >3) {
            fill(255);
            strokeWeight(7);
            stroke(0, 102, 204);
            rect(500, 500, 300, 50, 50);
            noStroke();
            fill(0, 102, 204);
            textSize(40);
            text('Instrucciones', 535, 540);            
            fill(255, 204, 0);
            strokeWeight(7);
            stroke(255);
            rect(550, 580, 200, 50, 50);
            noStroke();
            textSize(30);
            fill(255);
            text('Comenzar', 580, 615);
        }
    }
    
    start(counter, rocket, title, boat) {
        this.display(counter, rocket, title, boat);
        this.buttonsDisplay(counter);
    }

    winGameOne(img1, gif1) {
        image(img1, this.winAnimationX, this.winAnimationY);
        image(gif1, this.winAnimationX+100, this.winAnimationY+100)
     }
} 