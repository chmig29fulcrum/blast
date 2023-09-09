import * as PIXI from 'pixi.js';
import { App } from '../system/App';
import { state } from '../system/StateManager';

export class PanelScore {
  constructor() {
    this.container = new PIXI.Container();
    this.container.x = 750;
    this.container.y = 130;
    this.createBackground();

    this.stepsLeft = new PIXI.Text(App.config.maxStepsLeft, {
      fontFamily: 'Marvin',
      fontSize: 80,
      fill: 0xffffff,
    });
    this.stepsLeft.x = 110;
    this.stepsLeft.y = 45;
    this.container.addChild(this.stepsLeft);

    this.currentScore = new PIXI.Text(state.score, {
      fontFamily: 'Marvin',
      fontSize: 50,
      fill: 0xffffff,
    });
    this.currentScore.x = 140;
    this.currentScore.y = 200;
    this.container.addChild(this.currentScore);

    this.bonus = new PIXI.Text('Бонусы', {
      fontFamily: 'Marvin',
      fontSize: 25,
      fill: 0xffffff,
    });
    this.bonus.x = 100;
    this.bonus.y = 320;
    this.container.addChild(this.bonus);

    this.bonus = new PIXI.Text('Бустер Бомба', {
      fontFamily: 'Marvin',
      fontSize: 25,
      fill: 0xffffff,
    });
    this.bonus.x = 100;
    this.bonus.y = 470;
    this.container.addChild(this.bonus);

    this.bb = App.sprite('BoosterIndicator');
    this.bb.interactive = true;
    this.bb.on('pointerdown', () => {
      this.container.emit('BoosterBomb-touch-start', this.bb);
    });
    this.bb.x = 0;
    this.bb.y = 445;
    this.container.addChild(this.bb);

    this.bba = new PIXI.Text(App.config.boosterbombs, {
      fontFamily: 'Marvin',
      fontSize: 30,
      fill: 0xffffff,
    });
    this.bba.x = 40;
    this.bba.y = 470;
    this.container.addChild(this.bba);
  }
  updateCurrentScore() {
    this.currentScore.text = state.score;
  }
  createBackground() {
    this.bg = App.sprite('panel score');
    this.container.addChild(this.bg);
  }
}
