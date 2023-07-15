export class Texto {
    constructor(game) {
        this.game = game;
        this.fontSize = 20;
        this.fontFamily = "monospace";
        this.livesImage = document.getElementById("lives");

    }
    draw(context) {
        context.font = this.fontSize + "px " + this.fontFamily;
        context.textAlign = "left";
        context.fillStyle = this.game.fontColor;

        //score
        context.fillText("Score: " + this.game.score, 20, 50);
        localStorage.setItem("Score", this.game.score);

        //time
        context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
        context.fillText("Time: " + (this.game.time * 0.001).toFixed(1), 20, 80);

        //lives
        for (let i = 0; i < this.game.lives; i++) {
            context.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25)
        }
        localStorage.setItem("Lives", this.game.lives);

        // game over
        if (this.game.gameOver) {
            if (this.game.score > this.game.winningScore) {
                Swal.fire({
                    title: 'Winner',
                    text: "Desea volver a Jugar?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'OK!',
                    denyButtonText: `Score`,
                    confirmButtonColor: '#9b5de5',
                    denyButtonColor: "#00bbf9",
                    cancelButtonColor: "#ef233c",
                }).then((result) => {

                    if (result.isConfirmed) {
                        location.reload();
                    } else if (result.isDenied) {
                        Swal.fire("Score: ", localStorage.Score)
                    }
                })
            } else {
                Swal.fire({
                    title: 'Más Suerte la Próxima!',
                    text: "Desea volver a Jugar?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Ok!',
                    denyButtonText: `Score`,
                    confirmButtonColor: '#9b5de5',
                    denyButtonColor: "#00bbf9",
                    cancelButtonColor: "#ef233c",
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    } else if (result.isDenied) {
                        Swal.fire("Score: ", localStorage.Score)
                    }
                })
            }
        }
    }
}