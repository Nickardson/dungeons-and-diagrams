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
}
