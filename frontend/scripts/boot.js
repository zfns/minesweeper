var Config = window.G.Config;
var State = window.G.State;

State.boot = function (game) {};

State.boot.prototype = {

  init: function () {
    // 水平 竖直居中
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    // SHOW_ALL EXACT_FIT USER_SCALE
    // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // this.scale.setUserScale(0.5, 0.5);
    if (window.screen.width < Config.GAME_WIDTH) {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }
  },

  preload: function () {
    this.load.spritesheet('loading','assets/loading.png', 160, 160, 24, 1, 1);
  },

  create: function () {
    this.state.start('Loader');
  }

};
