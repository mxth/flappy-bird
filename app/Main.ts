import Phaser = require('phaser');

class Main extends Phaser.State {

  bird: Phaser.Sprite;

  pipes: Phaser.Group;

  timer: Phaser.TimerEvent;

  score: number;

  labelScore: Phaser.Text;

  preload() {

    // Change the background color of the game
    this.game.stage.backgroundColor = '#71c5cf';

    // Load the bird sprite
    this.game.load.image('bird', 'assets/bird.png');

    this.game.load.image('pipe', 'assets/pipe.png');
  }

  create() {
  // Set the physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Display the bird on the screen
    this.bird = this.game.add.sprite(100, 245, 'bird');

    // Add gravity to the bird to make it fall
    this.game.physics.arcade.enable(this.bird);
    this.bird.body.gravity.y = 1000;

    // Call the 'jump' function when the spacekey is hit
    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

    this.pipes = this.game.add.group();
    this.pipes.enableBody = true;
    this.pipes.createMultiple(20, 'pipe');

    this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);

    this.score = 0;
    this.labelScore = this.game.add.text(20, 20, "0", {font: "30px Arial", fill: "#ffffff"});
  }

  update() {
    // If the bird is out of the world (too high or too low), call the 'restartGame' function
    if (this.bird.inWorld == false)
      this.restartGame();

    this.game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);
  }

  jump() {
    this.bird.body.velocity.y = -350;
  }

  restartGame() {
    // Start the 'main' state, which restarts the game
    this.game.state.start('Main');
  }

  addOnePipe(x, y) {
    var pipe = this.pipes.getFirstDead();

    pipe.reset(x, y);

    pipe.body.velocity.x = -200;

    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
  }

  addRowOfPipes() {
    var hole = Math.floor(Math.random() * 5) + 1;

    for (var i = 0; i < 8; i++)
      if (i != hole && i != hole + 1)
        this.addOnePipe(400, i * 60 + 10);
        this.score += 1;
        this.labelScore.text = this.score.toString();
  }
}

export = Main;
