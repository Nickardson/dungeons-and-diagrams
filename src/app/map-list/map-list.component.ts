import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from 'src/logic/Board';

@Component({
  selector: 'app-map-list',
  templateUrl: './map-list.component.html',
  styleUrls: ['./map-list.component.scss']
})
export class MapListComponent implements OnInit {

  boards: Board[] = [];

  constructor(
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.boards.push(Board.fromDefinition({
      name: 'The Cursed Kiddie Pool',
      map: `
XXX  $
X     
X X   
X XXXX
    X!
!XX   `
    }));
    this.boards.push(Board.fromDefinition({
      name: '1x1',
      map: `
     XXX
 X X   !
 X!X XXX
 XXX   !
   X XXX
 $ X   !
   X XXX
XXXX   !`
    }));

//     this.boards.push(Board.fromDefinition({
//       name: 'Tenaxxus\'s Gullet',
//       map: `
//      !  
//         
//  $      
//         
//         
// !       
//         
//   !    !`
//     }));

    for (let i = 0; i < 4; i++) {
      this.boards = this.boards.concat(this.boards);
    }
  }

  chooseBoard(board: Board): void {
    const boardBase64 = btoa(JSON.stringify(board.toDefinition()));
    this.router.navigate(['/', 'map', boardBase64])
  }
}
