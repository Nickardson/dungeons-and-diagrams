import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnInit } from '@angular/core';
import { Board, BoardSquare, BoardSquareLocation } from 'src/logic/Board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {

  @Input()
  board?: Board;

  @Input()
  solution?: Board;

  heldButtonSetsTo?: BoardSquare;

  constructor(
    private readonly cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  getColumnGuideStyle(x: number): { [clazz: string]: unknown } {
    return {
      'grid-column': x + 2,
      'grid-row': 1,
    }
  }

  getRowGuideStyle(y: number): { [clazz: string]: unknown } {
    return {
      'grid-column': 1,
      'grid-row': y + 2,
    }
  }

  getSquareStyle(square: BoardSquareLocation): { [clazz: string]: unknown } {
    return {
      'grid-column': square.x + 1 + 1,
      'grid-row': square.y + 1 + 1,
      'background': square.square === BoardSquare.Wall ? '#5a442d' : undefined,
      'color': square.square === BoardSquare.MarkedOpen ? '#ff5c5c' : undefined,
    }
  }

  getSquareContents(square: BoardSquare): string {
    switch (square) {
      case BoardSquare.Monster:
        return String.fromCodePoint(0x1F984);
      case BoardSquare.TreasureChest:
        return String.fromCodePoint(0x1FA99);
      case BoardSquare.MarkedOpen:
        return String.fromCodePoint(0x2666);
      // case BoardSquare.Wall:
      //   return String.fromCodePoint(0x1F7EB);
      default:
        return '';
    }
  }

  getGridSize(): string {
    if (!this.board) {
      return '10vmin';
    }
    return ((100 / (Math.max(this.board.width, this.board.height) + 2))) + 'vmin';
  }

  onTouchStart(square: BoardSquareLocation): void {
    console.log('Touch start');
    if (square.square === BoardSquare.Open || square.square === BoardSquare.MarkedOpen) {
      this.board?.setSquareAt(square.x, square.y, BoardSquare.Wall);
      this.boardChanged();
    } else if (square.square === BoardSquare.Wall) {
      this.board?.setSquareAt(square.x, square.y, BoardSquare.MarkedOpen);
      this.boardChanged();
    }

    this.cdr.markForCheck();
  }

  onMouseDown(event: MouseEvent, square: BoardSquareLocation): void {
    console.log('Mouse down');
    this.heldButtonSetsTo = this.performMouseAction(event.button, square);

    this.cdr.markForCheck();
  }

  private performMouseAction(button: number, square: BoardSquareLocation): BoardSquare | undefined {
    let setTo: BoardSquare | undefined;

    if (button === 0) {
      // Left click
      if (square.square === BoardSquare.Wall) {
        setTo = BoardSquare.Open;
      } else if (square.square === BoardSquare.Open || square.square === BoardSquare.MarkedOpen) {
        setTo = BoardSquare.Wall;
      }
    } else if (button === 2) {
      // Right click
      if (square.square === BoardSquare.Wall) {
        setTo = BoardSquare.MarkedOpen;
      } else if (square.square === BoardSquare.Open) {
        setTo = BoardSquare.MarkedOpen;
      } else if (square.square === BoardSquare.MarkedOpen) {
        setTo = BoardSquare.Open;
      }
    }

    if (setTo !== undefined) {
      this.board?.setSquareAt(square.x, square.y, setTo);
      this.boardChanged();
      this.cdr.markForCheck();
    }

    return setTo;
  }

  onMouseEnter(square: BoardSquareLocation): void {
    console.log('Mouse enter');
    if (this.heldButtonSetsTo !== undefined) {
      switch (square.square) {
        case BoardSquare.MarkedOpen:
        case BoardSquare.Open:
        // case BoardSquare.TreasureRoom:
        case BoardSquare.Wall:
          this.board?.setSquareAt(square.x, square.y, this.heldButtonSetsTo);
          this.boardChanged();
          this.cdr.markForCheck();
      }
    }
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUpGlobal(event: MouseEvent): void {
    console.log('Mouse up');
    if (this.heldButtonSetsTo !== undefined) {
      this.heldButtonSetsTo = undefined;
      this.cdr.markForCheck();
    }
  }

  onContextMenu(event: Event): boolean {
    event.preventDefault();
    return false;
  }

  trackSquareFn(_index: number, square: BoardSquareLocation): string {
    return `${square.x},${square.y}`;
  }

  private boardChanged(): void {
    if (this.board && this.solution) {
      if (this.board.isEquivalentTo(this.solution)) {
        this.win();
      }
    }
  }

  private win(): void {
    // TODO: fancier dialog
    alert('You win!');
  }
}
