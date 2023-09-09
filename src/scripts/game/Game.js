import * as PIXI from 'pixi.js';
import { App } from '../system/App';
import { Scene } from '../system/Scene';
import { Board } from './Board';
import { PanelScore } from './PanelScore';
import { RedrawsLeftIndicator } from './RedrawsLeftIndicator';
import { CombinationManager } from './CombinationManager';
import { ScenesManager } from '../system/ScenesManager';
import { updateScore, resetScore } from '../system/StateManager';

export class Game extends Scene {
  create() {
    this.container = new PIXI.Container();
    this.createBackground();

    this.bombActive = false;
    this.board = new Board();
    this.container.addChild(this.board.container);
    this.panelScore = new PanelScore();
    this.container.addChild(this.panelScore.container);
    this.panelScore.container.on(
      'BoosterBomb-touch-start',
      this.onBonbButtonClick.bind(this)
    );

    this.redrawsLeftIndicator = new RedrawsLeftIndicator();
    this.container.addChild(this.redrawsLeftIndicator.container);
    this.board.container.on('tile-touch-start', this.onTileClick.bind(this));
    this.combinationManager = new CombinationManager(this.board);
    this.scenes = new ScenesManager();
    this.container.addChild(this.scenes.container);
    resetScore();
    this.panelScore.updateCurrentScore();
    this.checkForMatchesAndResetIfNeeded();
  }

  checkForMatchesAndResetIfNeeded() {
    let matches = [];
    while (matches.length == 0) {
      matches = this.combinationManager.getMatches();
      if (matches.length == 0) {
        this.board.destroy();
        this.board.createTiles();
        this.redrawsLeftIndicator.stepsLeft.text--;
        if (this.redrawsLeftIndicator.stepsLeft.text == 0) {
          this.scenes.start('MainMenu');
        }
      }
    }
  }
  onBonbButtonClick() {
    if (this.panelScore.bba.text > 0) {
      this.BombActive = true;
      App.changeCursorMode('crosshair');
    }
  }

  async onTileClick(tile) {
    let matches = [];
    if (this.BombActive) {
      matches = this.combinationManager.prepareTilesforBomb(tile);
      this.panelScore.bba.text--;
      this.BombActive = false;
      App.changeCursorMode('pointer');
    } else {
      matches = this.combinationManager.getAllMatches(tile);
    }

    if (matches.length) {
      await this.processMatches(matches);
      updateScore(matches.length);
      this.panelScore.updateCurrentScore();
      this.panelScore.stepsLeft.text--;
      if (this.panelScore.stepsLeft.text == 0) {
        console.log('GAME OVER!');
        this.scenes.start('MainMenu');
      }
    }
    this.checkForMatchesAndResetIfNeeded();
  }
  async processMatches(matches) {
    await this.removeMatches(matches);
    await this.processFallDown();
    await this.addTiles();
  }
  removeMatches(matches) {
    matches.forEach((match) => {
      match.remove();
    });
  }
  processFallDown() {
    return new Promise((resolve) => {
      let completed = 0;
      let started = 0;

      for (let row = this.board.rows - 1; row >= 0; row--) {
        for (let col = this.board.cols - 1; col >= 0; col--) {
          const field = this.board.getField(row, col);

          if (!field.tile) {
            ++started;

            this.fallDownTo(field).then(() => {
              ++completed;
              if (completed >= started) {
                resolve();
              }
            });
          }
        }
      }
    });
  }
  addTiles() {
    return new Promise((resolve) => {
      const fields = this.board.fields.filter((field) => field.tile === null);
      let total = fields.length;
      let completed = 0;
      fields.forEach((field) => {
        const tile = this.board.createTile(field);
        tile.sprite.y = -500;
        const delay = (Math.random() * 2) / 10 + 0.3 / (field.row + 1);
        tile.fallDownTo(field.position, delay).then(() => {
          ++completed;
          if (completed >= total) {
            resolve();
          }
        });
      });
    });
  }

  fallDownTo(emptyField) {
    for (let row = emptyField.row - 1; row >= 0; row--) {
      let fallingField = this.board.getField(row, emptyField.col);

      if (fallingField.tile) {
        const fallingTile = fallingField.tile;
        fallingTile.field = emptyField;
        emptyField.tile = fallingTile;
        fallingField.tile = null;
        return fallingTile.fallDownTo(emptyField.position);
      }
    }

    return Promise.resolve();
  }
  createBackground() {
    this.bg = App.sprite('background');
    this.bg.width = window.innerWidth;
    this.bg.height = window.innerHeight;
    this.container.addChild(this.bg);
  }
}
