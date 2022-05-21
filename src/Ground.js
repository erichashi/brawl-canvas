class Ground{
    constructor(x, y, img){
        this.x = x;
        this.y = y;
        this.img = img;
    }

    render() {
        ctx.drawImage(this.img, this.x, this.y, BLOCKSIZE, BLOCKSIZE);
    }
    
}