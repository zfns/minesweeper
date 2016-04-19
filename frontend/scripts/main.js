var Config = window.G.Config;
var State = window.G.State;

var Game = new Phaser.Game(Config.GAME_WIDTH, Config.GAME_HEIGHT, Phaser.AUTO, 'game-ctn');

Game.state.add('Boot', State.boot);
Game.state.add('Loader', State.loader);
Game.state.add('Menu', State.menu);
Game.state.add('Guide', State.guide);
Game.state.add('Game', State.game);

Game.state.start('Boot');
