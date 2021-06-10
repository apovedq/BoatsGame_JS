class lifeBar {
    constructor(x, y) {
        this.x = x+20;
        this.y = 160+y;
    }

    show(img4,img3,img2,img1,lifeCounter) {
        switch (lifeCounter) {
            case 1:
                image(img1, this.x, this.y);
                break;
            case 2:
                image(img2, this.x, this.y);
                break;
            case 3:
                image(img3, this.x, this.y);
                break;
            case 4:
                image(img4, this.x, this.y);
        }
    }
}