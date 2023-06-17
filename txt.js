export class Texto {
    constructor(game) {
        this.game = game;
        this.fontSize = 20;
        this.fontFamily = "Helvetica";
    }
    draw(context) {
        context.font = this.fontSize + "px " + this.fontFamily;
        context.textAlign = "left";
        context.fillStyle = this.game.fontColor;
        //score
        context.fillText("Score: " + this.game.score, 20, 50);
        localStorage.setItem("Score: ",this.game.score);
        //time
        context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
        context.fillText("Time: " + this.game.time, 20, 80);
        // game over
        if (this.game.gameOver) {
            context.textAlign = "center";
            context.font = this.fontSize * 2 + "px " + this.fontFamily;
            if (this.game.score > 20) {
                context.fillText = "Game Over";
            } else {
                context.fillText = "mas suerte la proxima";
            }
        }
    }
}