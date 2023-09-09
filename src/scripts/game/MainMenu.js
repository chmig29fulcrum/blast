import * as PIXI from 'pixi.js';
import { App } from '../system/App';
import { Scene } from '../system/Scene';
import { PurpleButton } from './PurpleButton';
import { ScenesManager } from '../system/ScenesManager';
import { state } from '../system/StateManager';

export class MainMenu extends Scene {
  create() {
    this.container = new PIXI.Container();

    this.createBackground();
    this.name = new PIXI.Text('-==[[[BLAST]]]==-', {
      fontFamily: 'Marvin',
      fontSize: 80,
      fill: 0xffffff,
    });
    this.name.x = 110;
    this.name.y = 45;
    this.container.addChild(this.name);

    this.lastGameScore = new PIXI.Text('Last Game Score = ' + state.score, {
      fontFamily: 'Marvin',
      fontSize: 55,
      fill: 0xffffff,
    });
    this.lastGameScore.x = 110;
    this.lastGameScore.y = 145;
    this.container.addChild(this.lastGameScore);

    this.pButton = new PurpleButton();
    this.container.addChild(this.pButton.container);
    this.pButton.container.on(
      'Button-touch-start',
      this.onButtonClick.bind(this)
    );
    this.scenes = new ScenesManager();
    this.container.addChild(this.scenes.container);
  }
  onButtonClick() {
    this.scenes.start('Game');
  }
  createBackground() {
    this.bg = App.sprite('background');
    this.bg.width = window.innerWidth;
    this.bg.height = window.innerHeight;
    this.container.addChild(this.bg);
  }
}
