import { App } from '../system/App';
import { Tools } from '../system/Tools';

export class CombinationManager {
  constructor(board) {
    this.board = board;
  }

  getNeighbourMatches(tile) {
    let neighbourMatches = [];
    App.config.combinationRules.forEach((rule) => {
      rule.forEach((position) => {
        const row = tile.field.row + position.row;
        const col = tile.field.col + position.col;
        const comparingField = this.board.getField(row, col);
        if (row >= 0 && col >= 0) {
          if (comparingField && comparingField.tile.color === tile.color) {
            neighbourMatches.push(comparingField.tile);
          }
        }
      });
    });
    return neighbourMatches;
  }

  getAllMatches(tile) {
    let matches = [tile];
    let tempMatches = [];
    let i = 0;

    while (matches.length > i) {
      tempMatches = this.getNeighbourMatches(matches[i]);
      Tools.addUniqueElementsFrom2to1array(matches, tempMatches);
      i++;
    }
    if (matches.length >= App.config.combinationRulesMinLength) {
      return matches;
    }
    return [];
  }

  getMatches() {
    let i = 0;
    let temp = [];
    let result = [];
    this.board.fields.forEach((checkingField) => {
      i++;
      temp = this.getAllMatches(checkingField.getTile());

      if (temp.length > 0) {
        result.push(temp);
      } else {
      }
    });
    return result;
  }

  prepareTilesforBomb(tile) {
    let col = tile.field.col;
    let row = tile.field.row;
    let result = [];
    let tempCol = col - 1;
    for (let x = 1; x <= 3; x++) {
      let tempRow = row - 1;
      for (let y = 1; y <= 3; y++) {
        if (tempRow >= 0 && tempCol >= 0) {
          const tempF = this.board.getField(tempRow, tempCol);
          result.push(tempF.tile);
        }
        tempRow++;
      }
      tempCol++;
    }
    return result;
  }
}
