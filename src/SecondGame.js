class SecondGame {
    
    constructor() {
        this.x = 40;

    }

    displayGame() {
        
    }
    
    gameClick() {
        
    }

    createWall(img1, x,y, obstacle) {
        image(img1, x, y);
        if (dist(x, y, obstacle.x, obstacle.y) < 30) {
            console.log(impact);
        }
    }

}