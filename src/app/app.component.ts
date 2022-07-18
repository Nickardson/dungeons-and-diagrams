import { Component } from '@angular/core';
import { Board, BoardSquare } from 'src/logic/Board';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dungeons-and-diagrams';

  board: Board;
  solution: Board;

  constructor() {
    this.solution = new Board(6, 6);
    this.solution.setSquareAt(0, 0, BoardSquare.Wall);
    this.solution.setSquareAt(1, 0, BoardSquare.Wall);
    this.solution.setSquareAt(2, 0, BoardSquare.Wall);
    this.solution.setSquareAt(3, 0, BoardSquare.Open);
    this.solution.setSquareAt(4, 0, BoardSquare.Open);
    this.solution.setSquareAt(5, 0, BoardSquare.TreasureChest);

    this.solution.setSquareAt(0, 1, BoardSquare.Wall);
    this.solution.setSquareAt(1, 1, BoardSquare.Open);
    this.solution.setSquareAt(2, 1, BoardSquare.Open);
    this.solution.setSquareAt(3, 1, BoardSquare.Open);
    this.solution.setSquareAt(4, 1, BoardSquare.Open);
    this.solution.setSquareAt(5, 1, BoardSquare.Open);

    this.solution.setSquareAt(0, 2, BoardSquare.Wall);
    this.solution.setSquareAt(1, 2, BoardSquare.Open);
    this.solution.setSquareAt(2, 2, BoardSquare.Wall);
    this.solution.setSquareAt(3, 2, BoardSquare.Open);
    this.solution.setSquareAt(4, 2, BoardSquare.Open);
    this.solution.setSquareAt(5, 2, BoardSquare.Open);

    this.solution.setSquareAt(0, 3, BoardSquare.Wall);
    this.solution.setSquareAt(1, 3, BoardSquare.Open);
    this.solution.setSquareAt(2, 3, BoardSquare.Wall);
    this.solution.setSquareAt(3, 3, BoardSquare.Wall);
    this.solution.setSquareAt(4, 3, BoardSquare.Wall);
    this.solution.setSquareAt(5, 3, BoardSquare.Wall);

    this.solution.setSquareAt(0, 4, BoardSquare.Open);
    this.solution.setSquareAt(1, 4, BoardSquare.Open);
    this.solution.setSquareAt(2, 4, BoardSquare.Open);
    this.solution.setSquareAt(3, 4, BoardSquare.Open);
    this.solution.setSquareAt(4, 4, BoardSquare.Wall);
    this.solution.setSquareAt(5, 4, BoardSquare.Monster);

    this.solution.setSquareAt(0, 5, BoardSquare.Monster);
    this.solution.setSquareAt(1, 5, BoardSquare.Wall);
    this.solution.setSquareAt(2, 5, BoardSquare.Wall);
    this.solution.setSquareAt(3, 5, BoardSquare.Open);
    this.solution.setSquareAt(4, 5, BoardSquare.Open);
    this.solution.setSquareAt(5, 5, BoardSquare.Open);

    // this.board = this.solution.clone();
    this.board = this.solution.clone();
    this.board.unsolve();
  }
}
