var G = window.G = {};

G.Config = {
  GAME_WIDTH: 650,
  GAME_HEIGHT: 800,

  GAME_GUIDE: [
    'Click to reveal the tile.',
    'Hold to set a flag in the tile.',
    'The number indicates the count of',
    'mines surrounding the tile.',
    'If you reveal all the digit tiles and',
    'flag all the mine tiles, you win.',
    'If you reveal any mine tile, you fail.',
    'Have fun!'
  ],

  BOARD_TOP: 100,

  LEVEL_EASY: {
    MINE_WIDTH: 33,
    MINE_HEIGHT: 33,
    ROW: 8,
    COL: 8,
    MINE_NUM: 10
  },
  LEVEL_NORMAL: {
    MINE_WIDTH: 32,
    MINE_HEIGHT: 32,
    ROW: 15,
    COL: 15,
    MINE_NUM: 38
  },
  LEVEL_HARD: {
    MINE_WIDTH: 32,
    MINE_HEIGHT: 32,
    ROW: 20,
    COL: 18,
    MINE_NUM: 60
  },

  MINE_STATE: {
    ZERO: 0,
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
    DEFAULT: 9,
    FLAG: 10,
    MINE: 11,
    EXPLODE: 12,
    MISTAKE: 13
  }
};

G.Var = {
  CURR_LEVEL: ''
};

G.State = {};
