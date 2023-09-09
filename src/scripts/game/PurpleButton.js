import * as PIXI from 'pixi.js';
import { App } from '../system/App';

export class PurpleButton {
  constructor() {
    this.container = new PIXI.Container();
    this.container.x = 200;
    this.container.y = 300;

    this.button = App.sprite('purpleButton');
    this.button.interactive = true;
    this.button.on('pointerdown', () => {
      this.container.emit('Button-touch-start', this.button);
    });
    this.container.addChild(this.button);

    this.stepsLeft = new PIXI.Text('New Game', {
      fontFamily: 'Marvin',
      fontSize: 80,
      fill: 0xffffff,
    });
    this.stepsLeft.x = 30;
    this.stepsLeft.y = 20;
    this.container.addChild(this.stepsLeft);
  }
  makeMove() {
    console.log(this.stepsLeft);
  }
}
