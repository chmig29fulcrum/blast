import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { Loader } from './Loader';
import { ScenesManager } from './ScenesManager';

class Application {
  run(config) {
    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);

    this.config = config;

    this.app = new PIXI.Application({ resizeTo: window });
    document.body.appendChild(this.app.view);

    this.app.renderer.plugins.interaction.cursorStyles.crosshair = 'crosshair';
    this.app.renderer.plugins.interaction.cursorStyles.pointer = 'pointer';

    this.scenes = new ScenesManager();
    this.app.stage.interactive = true;
    this.app.stage.addChild(this.scenes.container);

    this.loader = new Loader(this.app.loader, this.config);
    this.loader.preload().then(() => this.start());
  }
  changeCursorMode(cursorMode) {
    this.app.renderer.plugins.interaction.cursorStyles.default = cursorMode;
    this.app.renderer.plugins.interaction.setCursorMode(cursorMode);
  }

  res(key) {
    return this.loader.resources[key].texture;
  }

  sprite(key) {
    return new PIXI.Sprite(this.res(key));
  }

  start() {
    if (this.config.startScene) {
      this.scenes.start(this.config.startScene);
    } else {
      this.scenes.start('MainMenu');
    }
  }
}

export const App = new Application();
