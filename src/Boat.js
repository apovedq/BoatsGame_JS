function Boat(x, y, mode) {
    this.x = x;
    this.y = y;
    this.r = 80;
    this.mode = mode;

    this.show = function () {
        /* fill(255, 255, 0); */
        switch (this.mode) {
            
            case 0:
                image(img1U, this.x, this.y);
                break;
            case 1:
                image(img1D, this.x, this.y);
                break;
            case 2:
                image(img1R, this.x, this.y);
                break;
            case 3:
                image(img1L, this.x, this.y);
        }
    }

    this.move = function () {

        let speed = 3;

        //UP

        if (keyIsDown(87)) {

            this.mode = 0;
            this.y -= speed;
            img1U.play();
        } else {
            img1U.pause();
            img1U.reset();
        }
        //DOWN
        if (keyIsDown(83)) {

            this.mode = 1;
            this.y += speed;
            img1D.play();
        } else {
            img1D.pause();
            img1D.reset();
        }
        //RIGHT
        if (keyIsDown(68)) {

            this.mode = 2;
            this.x += speed;
            img1R.play();
        } else {
            img1R.pause();
            img1R.reset();
        }
        //LEFT
        if (keyIsDown(65)) {

            this.mode = 3;
            this.x -= speed;
            img1L.play();
        } else {
            img1L.pause();
            img1L.reset();
        }
    }

    this.hits= function (Obstaculo) {
        let d = dist(this.x, this.y, 450, 400);
        if (d < this.r + Obstaculo.r) {
            return true;
        } else {
            return false;
        }
        
    }
    this.hits2 = function (Obstaculo) {
        let d = dist(this.x, this.y, 45, 100);
        if (d < this.r + Obstaculo.r) {
            return true;
        } else {
            return false;
        }
        
    }
    this.hits3 = function (Obstaculo) {
        let d = dist(this.x, this.y, 800, 100);
        if (d < this.r + Obstaculo.r) {
            return true;
        } else {
            return false;
        }
        
    }
    this.crash = function () {
        this.x = 0;
        this.y = 500;

    }
    this.crash2 = function () {
        this.x = 125;
        this.y = 80;

    }

    this.restriction = function () {
        if (this.x < -50) { this.x = -50; }
        if (this.y < -50) { this.y = -50; }
        if (this.y > 680) { this.y = 680; }

    }

    this.setX = function (x) {
        this.x = x;
    }
    
}