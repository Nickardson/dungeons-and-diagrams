import { Component, Input, OnInit } from '@angular/core';
import { Board, BoardSquare } from 'src/logic/Board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input()
  board?: Board;

  constructor() { }

  ngOnInit(): void {
  }

  getSquareStyle(square: { x: number, y: number, square: BoardSquare }): { [clazz: string]: unknown } {
    return {
      'grid-column': square.x + 1,
      'grid-row': square.y + 1,
    }
  }

  getSquareContents(square: BoardSquare): string {
    switch (square) {
      case BoardSquare.Monster:
        return String.fromCodePoint(0x1F984);
      case BoardSquare.TreasureChest:
        return String.fromCodePoint(0x1FA99);
      case BoardSquare.Wall:
        return String.fromCodePoint(0x1F7EB);
      default:
        return '';
    }
  }
}
