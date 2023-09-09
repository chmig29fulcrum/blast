import * as PIXI from 'pixi.js';
import { App } from '../system/App';

export class RedrawsLeftIndicator {
  constructor() {
    this.container = new PIXI.Container();
    this.container.x = 400;
    this.container.y = 10;

    this.button = App.sprite('redrawsLeft');
    this.container.addChild(this.button);

    this.redrawsLeft = new PIXI.Text('Redraws Left', {
      fontFamily: 'Marvin',
      fontSize: 40,
      fill: 0xffffff,
    });
    this.redrawsLeft.x = -300;
    this.redrawsLeft.y = 10;
    this.container.addChild(this.redrawsLeft);

    this.stepsLeft = new PIXI.Text(App.config.maxRedraws, {
      fontFamily: 'Marvin',
      fontSize: 60,
      fill: 0xffffff,
    });
    this.stepsLeft.x = 70;
    this.stepsLeft.y = 0;
    this.container.addChild(this.stepsLeft);
  }
  makeMove() {
    console.log(this.redrawsLeft);
  }
}
