export class Board {
  private readonly grid: BoardSquare[][];
  private readonly columnGuides: number[];
  private readonly rowGuides: number[];

  private dirty = false;

  constructor(
    public readonly width: number,
    public readonly height: number
  ) {
    this.grid = [];
    for (let h = 0; h < height; h++) {
      const row = new Array(width).fill(BoardSquare.Open);
      this.grid.push(row);
    }

    this.columnGuides = new Array(width).fill(0);
    this.rowGuides = new Array(height).fill(0);
  }

  public clone(): Board {
    const newBoard = new Board(this.width, this.height);
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        newBoard.setSquareAt(x, y, this.getSquareAt(x, y));
      }
    }

    return newBoard;
  }

  [Symbol.iterator](): BoardIterator {
    return new BoardIterator(this);
  }

  /**
   * Gets the square at a given coordinate. If the coordinate is out of bounds, a Wall is returned.
   * @param x X
   * @param y Y
   */
  public getSquareAt(x: number, y: number): BoardSquare {
    if (!this.isInBounds(x, y)) {
      return BoardSquare.Wall;
    }

    return this.grid[y][x];
  }

  private isInBounds(x: number, y: number) {
    return !(x < 0 || y < 0 || x >= this.width || y >= this.height);
  }

  public setSquareAt(x: number, y: number, square: BoardSquare): void {
    if (!this.isInBounds(x, y)) {
      throw new Error(`Cannot set square out of bounds at ${x}, ${y} to ${square}`);
    }

    this.grid[y][x] = square;
    this.dirty = true;
  }

  public getColumnGuides(): number[] {
    this.rebuildIfDirty();

    return this.columnGuides;
  }

  public getRowGuides(): number[] {
    this.rebuildIfDirty();

    return this.rowGuides;
  }

  private rebuildIfDirty() {
    if (this.dirty) {
      this.rebuildGuides();
      this.dirty = false;
    }
  }

  private rebuildGuides() {
    for (let x = 0; x < this.width; x++) {
      const notWalls = this.getSquaresInColumn(x).filter(s => s !== BoardSquare.Wall);
      this.columnGuides[x] = this.height - notWalls.length;
    }

    for (let y = 0; y < this.height; y++) {
      const notWalls = this.getSquaresInRow(y).filter(s => s !== BoardSquare.Wall);
      this.rowGuides[y] = this.width - notWalls.length;
    }
  }

  public getSquaresInRow(y: number): BoardSquare[] {
    return new Array(this.width).fill(BoardSquare.Open).map((_, x) => this.getSquareAt(x, y));
  }

  public getSquaresInColumn(x: number): BoardSquare[] {
    return new Array(this.height).fill(BoardSquare.Open).map((_, y) => this.getSquareAt(x, y));
  }
}

class BoardIterator implements Iterator<{ x: number, y: number, square: BoardSquare }> {
  private x = 0;
  private y = 0;

  constructor(private readonly board: Board) {
  }

  next(): IteratorResult<{ x: number, y: number, square: BoardSquare }, any> {
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

export enum BoardSquare {
  Open,
  Wall,
  TreasureRoom,
  TreasureChest,
  Monster
}
