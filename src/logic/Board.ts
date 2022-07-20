import { BoardDefinition } from "./BoardDefinition";
import { BoardIterator } from "./BoardIterator";
import { BoardSquare } from "./BoardSquare";

const charsToSquares = new Map<string, BoardSquare>();
const squaresToChars = new Map<BoardSquare, string>();
charsToSquares.set(' ', BoardSquare.Open);
charsToSquares.set('X', BoardSquare.Wall);
charsToSquares.set('!', BoardSquare.Monster);
charsToSquares.set('$', BoardSquare.TreasureChest);
charsToSquares.forEach((val, key) => squaresToChars.set(val, key));

export class Board {
  private readonly grid: BoardSquare[][];
  private readonly columnGuides: number[];
  private readonly rowGuides: number[];

  private dirty = false;

  constructor(
    public readonly width: number,
    public readonly height: number,
    public name: string,
  ) {
    this.grid = [];
    for (let h = 0; h < height; h++) {
      const row = new Array(width).fill(BoardSquare.Open);
      this.grid.push(row);
    }

    this.columnGuides = new Array(width).fill(0);
    this.rowGuides = new Array(height).fill(0);
  }

  public toString(): string {
    const lines: string[] = [];
    for (let y = 0; y < this.height; y++) {
      lines.push(this.getSquaresInRow(y).map(s => squaresToChars.get(s)).join(''));
    }

    return lines.join('\n');
  }

  public toDefinition(): BoardDefinition {
    return {
      map: this.toString(),
      name: this.name,
    };
  }

  public static fromDefinition(definition: BoardDefinition): Board {
    const map = definition.map;
    const lines = map
      .split('\n')
      .map(line => line.replace(/\r/g, ''))
      .filter(line => line.length > 0);

    if (lines.length === 0) {
      return new Board(0, 0, definition.name);
    }

    const width = lines.reduce((acc, line) => Math.max(line.length, acc), 0);
    const height = lines.length;

    const board = new Board(width, height, definition.name);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < lines[y].length; x++) {
        const square = charsToSquares.get(lines[y].charAt(x));
        if (square) {
          board.setSquareAt(x, y, square);
        }
      }
    }

    return board;
  }

  public clone(): Board {
    const newBoard = new Board(this.width, this.height, this.name);
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
      this.columnGuides[x] = this.countWallsInColumn(x);
    }

    for (let y = 0; y < this.height; y++) {
      this.rowGuides[y] = this.countWallsInRow(y);
    }
  }

  public countWallsInColumn(x: number): number {
    const walls = this.getSquaresInColumn(x).filter(s => s === BoardSquare.Wall);
    return walls.length;
  }

  public countWallsInRow(y: number): number {
    const walls = this.getSquaresInRow(y).filter(s => s === BoardSquare.Wall);
    return walls.length;
  }

  public getSquaresInRow(y: number): BoardSquare[] {
    return new Array(this.width).fill(BoardSquare.Open).map((_, x) => this.getSquareAt(x, y));
  }

  public getSquaresInColumn(x: number): BoardSquare[] {
    return new Array(this.height).fill(BoardSquare.Open).map((_, y) => this.getSquareAt(x, y));
  }

  public unsolve(): void {
    for (let square of this) {
      if (square.square === BoardSquare.Wall/* || square.square === BoardSquare.TreasureRoom*/) {
        this.setSquareAt(square.x, square.y, BoardSquare.Open);
      }
    }
  }

  /**
   * @param solution The actual solution
   * @returns Whether the player set all the right squares to match the solution
   */
  public isEquivalentTo(solution: Board): boolean {
    for (let square of solution) {
      const thisSquare = this.getSquareAt(square.x, square.y);
      switch (square.square) {
        case BoardSquare.MarkedOpen:
        case BoardSquare.Open:
          if (thisSquare !== BoardSquare.MarkedOpen && thisSquare !== BoardSquare.Open) {
            return false;
          }
          break;
        case BoardSquare.Wall:
          if (thisSquare !== BoardSquare.Wall) {
            return false;
          }
          break;
        default:
        // The rest can't be changed or otherwise don't matter
      }
    }

    return true;
  }
}
