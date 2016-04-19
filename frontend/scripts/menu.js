var State = window.G.State;
var Var = window.G.Var;

State.menu = function (game) {};

State.menu.prototype = {

  init: function () {
    var self = this;
    self.add.image(0, 0, 'bg');
  },

  preload: function () {

  },

  create: function () {
    var self = this;

    var btnLevelEasy = self.add.button(self.world.centerX, self.world.centerY - 80, 'btn-level-easy', self.selectEasyLevel, self);
    var btnLevelNomal = self.add.button(self.world.centerX, self.world.centerY, 'btn-level-normal', self.selectNormalLevel, self);
    var btnLevelHard = self.add.button(self.world.centerX, self.world.centerY + 80, 'btn-level-hard', self.selectHardLevel, self);
    var btnHow2Play = self.add.button(self.world.centerX, self.world.centerY + 160, 'btn-how-2-play', self.selectGuide, self);
    btnLevelEasy.anchor = { x: 0.5, y: 0.5 };
    btnLevelNomal.anchor = { x: 0.5, y: 0.5 };
    btnLevelHard.anchor = { x: 0.5, y: 0.5 };
    btnHow2Play.anchor = { x: 0.5, y: 0.5 };
  },

  selectEasyLevel: function() {
    Var.CURR_LEVEL = 'LEVEL_EASY';
    this.state.start('Game');
  },

  selectNormalLevel: function() {
    Var.CURR_LEVEL = 'LEVEL_NORMAL';
    this.state.start('Game');
  },

  selectHardLevel: function() {
    Var.CURR_LEVEL = 'LEVEL_HARD';
    this.state.start('Game');
  },

  selectGuide: function() {
    this.state.start('Guide');
  }

};
