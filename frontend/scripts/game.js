var State = window.G.State;
var Var = window.G.Var;
var Config = window.G.Config;

State.game = function (game) {};

State.game.prototype = {

  init: function () {
    var self = this;
    self.add.image(0, 0, 'bg');

    self.face = self.add.sprite(305, 20, 'face', 1);
    self.face.scale.setTo(0.3, 0.3);
  },

  preload: function () {

  },

  create: function () {
    var self = this;

    self.tiles = [];
    self.drawBoard();

    self.elapsed = 0;
    self.counter = self.add.text(20, 20, 'Time: 0', { font: '25px Arial', fill: '#ffffff'});
    self.loop = self.time.events.loop(Phaser.Timer.SECOND, self.updateCounter, self);

    self.retry = self.add.text(Config.GAME_WIDTH - 170, 20, 'Retry', { font: '25px Arial', fill: '#ffffff'});
    self.retry.inputEnabled = true;
    self.retry.input.useHandCursor = true;
    self.retry.events.onInputDown.add(self.restart, self);

    self.menu = self.add.text(Config.GAME_WIDTH - 90, 20, 'Menu', { font: '25px Arial', fill: '#ffffff'});
    self.menu.inputEnabled = true;
    self.menu.input.useHandCursor = true;
    self.menu.events.onInputDown.add(self.back2Menu, self);
  },

  updateCounter: function() {
    var self = this;
    self.elapsed++;
    self.counter.setText('Time: ' + self.elapsed);
  },

  restart: function() {
    this.state.start('Game');
  },

  back2Menu: function() {
    this.state.start('Menu');
  },

  drawBoard: function() {
    var self = this;
    var currLevel = Config[Var.CURR_LEVEL];
    var top = Config.BOARD_TOP;
    var left = (Config.GAME_WIDTH - currLevel.MINE_WIDTH * currLevel.COL) / 2;

    for (var i = 0; i < currLevel.ROW; i++) {
      var row = [];
      for (var j = 0; j < currLevel.COL; j++) {
        var x = left + j * currLevel.MINE_WIDTH;
        var y = top + i * currLevel.MINE_HEIGHT;
        var tile = new Tile(i, j, x, y, self);
        row.push(tile);
      }
      self.tiles.push(row);
    }

    self.setMines();
  },

  setMines: function() {
    var self = this;
    var currLevel = Config[Var.CURR_LEVEL];
    var tiles = self.tiles;

    for (var i = 0; i < currLevel.MINE_NUM; i++) {
      var x = ~~(currLevel.COL * Math.random());
      var y = ~~(currLevel.ROW * Math.random());
      while (tiles[y][x].realState == Config.MINE_STATE.MINE) {
        x = ~~(currLevel.COL * Math.random());
        y = ~~(currLevel.ROW * Math.random());
      }
      tiles[y][x].realState = Config.MINE_STATE.MINE;
    }

    for (var i = 0; i < currLevel.ROW; i++) {
      for (var j = 0; j < currLevel.COL; j++) {
        if (tiles[i][j].realState != Config.MINE_STATE.MINE) {
          var cnt = 0;
          if (i - 1 >= 0 && j - 1 >= 0 && tiles[i - 1][j - 1].realState == Config.MINE_STATE.MINE) cnt++;
          if (i - 1 >= 0 && tiles[i - 1][j].realState == Config.MINE_STATE.MINE) cnt++;
          if (i - 1 >= 0 && j + 1 < currLevel.COL && tiles[i - 1][j + 1].realState == Config.MINE_STATE.MINE) cnt++;
          if (j - 1 >= 0 && tiles[i][j - 1].realState == Config.MINE_STATE.MINE) cnt++;
          if (j + 1 < currLevel.COL && tiles[i][j + 1].realState == Config.MINE_STATE.MINE) cnt++;
          if (i + 1 < currLevel.ROW && j - 1 >= 0 && tiles[i + 1][j - 1].realState == Config.MINE_STATE.MINE) cnt++;
          if (i + 1 < currLevel.ROW && tiles[i + 1][j].realState == Config.MINE_STATE.MINE) cnt++;
          if (i + 1 < currLevel.ROW && j + 1 < currLevel.COL && tiles[i + 1][j + 1].realState == Config.MINE_STATE.MINE) cnt++;
          tiles[i][j].realState = cnt;
        }
      }
    }
  },

  check: function() {
    var self = this;
    var currLevel = Config[Var.CURR_LEVEL];
    var tiles = self.tiles;
    var pass = true;

    loop:
    for (var i = 0; i < currLevel.ROW; i++) {
      for (var j = 0; j < currLevel.COL; j++) {
        var tile = tiles[i][j];
        if (tile.realState == Config.MINE_STATE.MINE) {
          if (tile.currState != Config.MINE_STATE.FLAG) {
            pass = false;
            break loop;
          }
        } else {
          if (tile.realState != tile.currState) {
            pass = false;
            break loop;
          }
        }
      }
    }

    if (pass) self.win();
  },

  win: function() {
    var self = this;
    var currLevel = Config[Var.CURR_LEVEL];
    var tiles = self.tiles;

    for (var i = 0; i < currLevel.ROW; i++) {
      for (var j = 0; j < currLevel.COL; j++) {
        tiles[i][j].sp.inputEnabled = false;
      }
    }

    self.time.events.remove(self.loop);

    self.face.animations.frame = 2;
  },

  fail: function() {
    var self = this;
    self.time.events.remove(self.loop);

    self.face.animations.frame = 0;
  }

};

var Tile = function(row, col, offsetX, offsetY, ctx) {
  var self = this;

  self.realState = Config.MINE_STATE.ZERO;
  self.currState = Config.MINE_STATE.DEFAULT;
  self.row = row;
  self.col = col;
  self.offsetX = offsetX;
  self.offsetY = offsetY;
  self.ctx = ctx;

  self.sp = ctx.add.sprite(self.offsetX, self.offsetY, 'mine', self.currState);

  self.init();

  self.sub('RevealAll');
  self.sub('AutoReveal');
};

Tile.prototype.init = function() {
  var self = this;

  self.sp.inputEnabled = true;
  self.sp.input.useHandCursor = true;
  self.sp.events.onInputOut.add(self.onOut, self);
  self.sp.events.onInputOver.add(self.onOver, self);
  self.sp.events.onInputDown.add(self.onDown, self);
  self.sp.events.onInputUp.add(self.onUp, self);
};

Tile.prototype.onOver = function() {
  var self = this;
  var tween = self.ctx.add.tween(self.sp);
  tween.to({ x: self.offsetX - 2, y: self.offsetY - 2 }, 100, Phaser.Easing.Exponential.easeOut);
  tween.start();
};

Tile.prototype.onOut = function() {
  var self = this;
  var tween = self.ctx.add.tween(self.sp);
  tween.to({ x: self.offsetX, y: self.offsetY }, 100, Phaser.Easing.Exponential.easeOut);
  tween.start();
};

Tile.prototype.onDown = function() {
  var self = this;
  self.onDownTime = Date.now();
};

Tile.prototype.onUp = function() {
  var self = this;
  if (Date.now() - self.onDownTime < 300) {
    self.onClick();
  } else {
    self.onHold();
  }
};

Tile.prototype.onClick = function() {
  var self = this;
  var tween = self.ctx.add.tween(self.sp);
  tween.to({ x: self.offsetX, y: self.offsetY }, 100, Phaser.Easing.Exponential.easeOut);
  tween.start();

  if (self.currState == Config.MINE_STATE.FLAG) return;

  if (self.realState == Config.MINE_STATE.MINE) {
    self.currState = Config.MINE_STATE.EXPLODE;
    self.sp.animations.frame = self.currState;
    self.pub('RevealAll');
    self.ctx.fail();
    return;
  }

  self.currState = self.realState;
  self.sp.animations.frame = self.currState;
  self.sp.inputEnabled = false;
  self.ctx.check();

  if (self.realState == Config.MINE_STATE.ZERO) {
    self.pub('AutoReveal', {
      row: self.row,
      col: self.col
    });
  }
};

Tile.prototype.onHold = function() {
  var self = this;
  var tween = self.ctx.add.tween(self.sp);
  tween.to({ x: self.offsetX, y: self.offsetY }, 100, Phaser.Easing.Exponential.easeOut);
  tween.start();

  if (self.currState == Config.MINE_STATE.DEFAULT) {
    self.currState = Config.MINE_STATE.FLAG;
    self.sp.animations.frame = self.currState;
  } else {
    self.currState = Config.MINE_STATE.DEFAULT;
    self.sp.animations.frame = self.currState;
  }
  self.ctx.check();
};

Tile.prototype.onRevealAll = function() {
  var self = this;
  if (self.currState == Config.MINE_STATE.DEFAULT) {
    self.currState = self.realState;
    self.sp.animations.frame = self.currState;
  } else if (self.currState == Config.MINE_STATE.FLAG) {
    if (self.realState != Config.MINE_STATE.MINE) {
      self.currState = Config.MINE_STATE.MISTAKE;
      self.sp.animations.frame = self.currState;
    }
  }
  self.sp.inputEnabled = false;
};

Tile.prototype.onAutoReveal = function(data) {
  var self = this;

  if (self.row == data.row && self.col == data.col) return;

  if (self.currState == Config.MINE_STATE.DEFAULT &&
      self.row >= data.row - 1 && self.row <= data.row + 1 &&
      self.col >= data.col - 1 && self.col <= data.col + 1) {
    if (self.realState >= Config.MINE_STATE.ZERO &&
        self.realState <= Config.MINE_STATE.EIGHT) {
      self.currState = self.realState;
      self.sp.animations.frame = self.currState;
      self.sp.inputEnabled = false;
      self.ctx.check();

      if (self.realState == Config.MINE_STATE.ZERO) {
        self.pub('AutoReveal', {
          row: self.row,
          col: self.col
        });
      }
    }
  }
};

Tile.prototype.sub = function(evt) {
  var self = this;
  if (!Tile.Events[evt]) {
    Tile.Events[evt] = [];
  }
  Tile.Events[evt].push(self);
};

Tile.prototype.pub = function(evt, data) {
  if (Tile.Events[evt]) {
    Tile.Events[evt].forEach(function(e) {
      if (e['on' + evt]) {
        e['on' + evt](data);
      }
    });
  }
};

Tile.Events = {};
