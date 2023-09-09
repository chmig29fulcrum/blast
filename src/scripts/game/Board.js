import * as PIXI from 'pixi.js';
import { App } from '../system/App';
import { Field } from './Field';
import { TileFactory } from './TileFactory';
import { Tile } from './Tile';

export class Board {
  constructor() {
    this.container = new PIXI.Container();
    this.fields = [];
    this.rows = App.config.board.rows;
    this.cols = App.config.board.cols;

    this.createBackground();
    this.create();
    this.adjustPosition();
  }

  adjustPosition() {
    this.fieldSize = this.fields[0].sprite.width;
    this.width = this.cols * this.fieldSize;
    this.height = this.rows * this.fieldSize;
    this.container.x = 100;
    this.container.y = 100;
  }

  createBackground() {
    this.bg = App.sprite('board');
    this.container.addChild(this.bg);
  }

  create() {
    this.createFields();
    this.createTiles();
  }
  createTiles() {
    this.fields.forEach((field) => this.createTile(field));
  }

  createTile(field) {
    const tile = TileFactory.generate();
    tile.sprite.interactive = true;
    tile.sprite.on('pointerdown', () => {
      this.container.emit('tile-touch-start', tile);
    });

    field.setTile(tile);
    this.container.addChild(tile.sprite);
    return tile;
  }
  createFields() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.createField(row, col);
      }
    }
  }
  createField(row, col) {
    const field = new Field(row, col);
    this.fields.push(field);
  }
  getField(row, col) {
    return this.fields.find((field) => field.row === row && field.col === col);
  }
  destroy() {
    this.fields.forEach((field) => {
      if (field.tile) {
        field.tile.remove();
      }
    });
  }
}
