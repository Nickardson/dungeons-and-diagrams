import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/logic/Board';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {

  board: Board;
  solution: Board;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly route: ActivatedRoute,
  ) {
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

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const def = params.get('definition');
      if (def) {
        const definition = atob(def);
        this.solution = Board.fromString(definition);
        this.board = this.solution.clone();
        this.board.unsolve();
        this.cdr.markForCheck();
      }
    })
  }

}
