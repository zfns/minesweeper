var State = window.G.State;

State.loader = function (game) {
  var self = this;
  self.progress = '';
};

State.loader.prototype = {

  init: function () {
    var self = this;

    var loading = self.add.sprite(self.world.centerX, self.world.centerY, 'loading');
    loading.anchor = { x: 0.5, y: 0.5 };
    loading.animations.add('loading');
    loading.animations.play('loading', 24, true);

    self.progress = self.add.text(self.world.centerX, self.world.centerY + 90, '0%', { fill: '#fff', fontSize: '16px' });
    self.progress.anchor = { x: 0.5, y: 0.5 };
  },

  preload: function () {
    var self = this;

    self.load.image('bg', 'assets/bg.png');
    self.load.image('bg2', 'assets/bg2.png');
    self.load.image('btn-level-easy', 'assets/btn-level-easy.png');
    self.load.image('btn-level-normal', 'assets/btn-level-normal.png');
    self.load.image('btn-level-hard', 'assets/btn-level-hard.png');
    self.load.image('btn-how-2-play', 'assets/btn-how-2-play.png');
    self.load.image('btn-back-2-menu', 'assets/btn-back-2-menu.png');
    self.load.spritesheet('mine', 'assets/mine.png', 33, 33);
    self.load.spritesheet('face', 'assets/face.png', 128, 128);

    self.load.onFileComplete.add(function(pro) {
      self.progress.text = pro + '%';
    });
  },

  create: function () {
    this.state.start('Menu');
  }

};
