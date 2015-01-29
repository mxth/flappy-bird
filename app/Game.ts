import Phaser = require('phaser');
import Main = require('Main');

class Game extends Phaser.Game {

  constructor() {

    super(400, 490, Phaser.AUTO, 'content', null);

    this.state.add('Main', Main, false);

    this.state.start('Main');

  }

}

export = Game
