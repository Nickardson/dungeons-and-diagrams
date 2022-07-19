import { BoardSquareLocation } from "./BoardSquareLocation";
import { Board } from "./Board";

export class BoardIterator implements Iterator<BoardSquareLocation> {
  private x = 0;
  private y = 0;

  constructor(private readonly board: Board) {
  }

  next(): IteratorResult<BoardSquareLocation, any> {
    const square = this.board.getSquareAt(this.x, this.y);
    const x = this.x;
    const y = this.y;

    const isDone = this.y >= this.board.height;

    this.x++;
    if (this.x >= this.board.width) {
      this.x = 0;
      this.y++;
    }

    return {
      done: isDone,
      value: { square, x, y },
    };
  }
}
