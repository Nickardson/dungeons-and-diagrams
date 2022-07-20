import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/logic/Board';
import { BoardDefinition } from 'src/logic/BoardDefinition';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {

  board: Board;
  solution: Board;

  name: string = '???';

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
      const base64Def = params.get('definition');
      if (base64Def) {
        const stringDef = atob(base64Def);
        const definition = JSON.parse(stringDef) as BoardDefinition;

        this.solution = Board.fromString(definition.map);
        this.name = definition.name;

        this.board = this.solution.clone();
        this.board.unsolve();

        this.cdr.markForCheck();
      }
    })
  }
}
