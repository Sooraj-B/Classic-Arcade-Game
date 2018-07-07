'use strict';
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 100 + 1);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    var canvasWidth = 505;

    // Resets enemy with a new speed after it goes off canvas.
    if (this.x > canvasWidth) {
        this.x = -105;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.startx = 200;
    this.starty = 400;
    this.x = this.startx;
    this.y = this.starty;
    this.speed = 100; //speed of the player movements
    this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt) {
    // this.render();
    this.checkCollisions();
    this.win();
};

//input handling as well as restricting player inside the canvas
var upLimit = -10;
var downLimit = 400;
var leftLimit = 0;
var rightLimit = 400;
Player.prototype.handleInput = function(direction) {
    if (direction === 'up' && this.y > upLimit) {
        this.y -= 82;
    }
    if (direction === 'down' && this.y < downLimit) {
        this.y += 82;
    }
    if (direction === 'left' && this.x > leftLimit) {
        this.x -= 100;
    }
    if (direction === 'right' && this.x < rightLimit) {
        this.x += 100;
    }
};

//collision detection
Player.prototype.checkCollisions = function() {
    for (var i = 0; i <= 3; i++) {
        if (allEnemies[i].x < this.x + 80 &&
            allEnemies[i].x + 80 > this.x &&
            allEnemies[i].y < this.y + 25 &&
            allEnemies[i].y + 25 > this.y) {
            alert('You Loose! Try again');
            this.reset();
        }
    }
};

//game reset procedure
Player.prototype.reset = function() {
    this.x = this.startx;
    this.y = this.starty;
};

//game winning procedure
Player.prototype.win = function() {
    if (this.y === -10) {
        this.reset();
        alert('YOU WON!');
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
    new Enemy(0, 60, 500),
    new Enemy(0, 145, 150),
    new Enemy(0, 230, 200)
];
//insert new enemies after an enemy goes off-screen in a row
for (var e = 0; e <= 3; e++) {
    allEnemies.push(new Enemy());
}
// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// var player = new player();
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});