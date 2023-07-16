import{Dust} from "./particles.js";

const states = {
    IDLE: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    HIT: 4,
    DIZZY: 5
}

class State {
    constructor(state, game){
        this.state= state;
        this.game = game;
    }
}
export class Idle extends State {
    constructor(game){
        super("IDLE", game);
    }
    enter(){
        this.game.player.maxFrame = 20;
        this.game.player.frameX = 0;
        this.game.player.frameY = 0;
    }
    handleInput(input) {
        if (input.includes("ArrowLeft") || input.includes("ArrowRight")){
            this.game.player.setState(states.RUNNING, 1);
        } else if(input.includes("Enter")){
            this.game.player.setState(states.HIT, 1);
        } else if (input.includes("ArrowUp")){
            this.game.player.setState(states.JUMPING, 1);
        }
    }
}
export class Running extends State {
    constructor(game){
        super("RUNNING", game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 12;
        this.game.player.frameY = 1;

    }
    handleInput(input) {
        this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.6, this.game.player.y + this.game.player.height ));
        if (input.includes("ArrowDown")) {
            this.game.player.setState(states.IDLE, 0);
        } else if (input.includes("ArrowUp")){
            this.game.player.setState(states.JUMPING, 1);
        } else if(input.includes("Enter")){
            this.game.player.setState(states.HIT, 1);
        }
    }
}
export class Jumping extends State {
    constructor(game){
        super("JUMPING", game);

    }
    enter(){
        if(this.game.player.onGround()) this.game.player.vy -= 20;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 10;
        this.game.player.frameY = 2;
    }
    handleInput(input) {
        if (this.game.player.vy > this.game.player.weight) {
            this.game.player.setState(states.FALLING, 1);
        } else if(input.includes("Enter")){
            this.game.player.setState(states.HIT, 1);
        }
    }
}
export class Falling extends State {
    constructor(game){
        super("FALLING", game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 10;
        this.game.player.frameY = 3;
    }
    handleInput(input) {
        if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
        } 
    }
}

export class Hit extends State {
    constructor(game){
        super("HIT", game);
    }
    enter(){
        this.game.player.maxFrame = 20;
        this.game.player.frameX = 0;
        this.game.player.frameY = 9;
    }
    handleInput(input) {
        if (!input.includes("Enter") && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
        }   else if (!input.includes("Enter") && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING, 2);
        }   else if (input.includes("Enter") && input.includes("ArrowUp") && this.game.player.onGround()) {
            this.game.player.vy -= 27;
        }
    }
}

export class Dizzy extends State {
    constructor(game){
        super("DIZZY", game);

    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 20;
        this.game.player.frameY = 5;
    }
    handleInput(input) {
        if (this.game.player.frameX >= 20 && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
        }   else if (this.game.player.frameX >= 20 && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING, 2);
        }  
    }
}