import { Component } from '@angular/core';
import { Board } from 'src/logic/Board';
import { BoardSquare } from "src/logic/BoardSquare";

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
    this.solution = Board.fromString(`
XXX  $
X     
X X   
X XXXX
    X!
!XX   `);

    this.board = this.solution.clone();
    this.board.unsolve();
  }
}
