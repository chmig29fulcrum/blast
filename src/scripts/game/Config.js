import { Game } from './Game';
import { MainMenu } from './MainMenu';

import { Tools } from '../system/Tools';

export const Config = {
  loader: Tools.massiveRequire(
    require['context']('./../../sprites/', true, /\.(mp3|png|jpe?g)$/)
  ),
  scenes: {
    Game: Game,
    MainMenu: MainMenu,
  },
  startScene: 'MainMenu',
  board: {
    rows: 9,
    cols: 9,
  },
  tilesColors: ['blue', 'green', 'purple', 'red', 'yellow'],
  combinationRules: [
    [
      { col: -1, row: 0 },
      { col: 1, row: 0 },
    ],
    [
      { col: 0, row: -1 },
      { col: 0, row: 1 },
    ],
  ],

  combinationRulesMinLength: 5,
  maxStepsLeft: 20,
  maxRedraws: 5,
  boosterbombs: 3,
};
