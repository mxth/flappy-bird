var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'phaser', 'Main'], function (require, exports, Phaser, Main) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 400, 490, Phaser.AUTO, 'content', null);
            this.state.add('Main', Main, false);
            this.state.start('Main');
        }
        return Game;
    })(Phaser.Game);
    return Game;
});
