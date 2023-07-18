import {
    Idle,
    Running,
    Jumping,
    Falling,
    Hit, 
    Dizzy
} from "./playerStates.js";

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 180;
        this.height = 121.4;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById("player");
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 60;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.states = [new Idle(game), new Running(game), new Jumping(game), new Falling(game), new Hit(game), new Dizzy(game)];
    }
    update(input, deltaTime) {
        this.checkCollision();
        this.currentState.handleInput(input);
        // horizontal
        this.x += this.speed;
        if (input.includes("ArrowRight")) {this.speed = this.maxSpeed;
        } else if (input.includes("ArrowLeft")) {this.speed = -this.maxSpeed;
        } else this.speed = 0;
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.widht - this.width) this.x = this.game.widht - this.width;

        //vertical
        this.y += this.vy;
        if (!this.onGround()) {this.vy += this.weight;
        } else this.vy = 0;

        //sprite animation 
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) {this.frameX++;
            } else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }

    setState(state, speed) {
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }

    checkCollision(){
        this.game.enemies.forEach(enemy => {
            if (
                enemy.x < this.x + this.width -40 &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height -20 &&
                enemy.y + enemy.height > this.y 
            ){
                enemy.markedForDeletion = true;
                if(this.currentState === this.states[4] || this.currentState === this.states[5] ){
                    this.game.score++;
                }   else {
                    this.setState(5, 0);
                    this.game.lives--;
                    if (this.game.lives <= 0) this.game.gameOver= true;
                }   
            }
        });
    }
}