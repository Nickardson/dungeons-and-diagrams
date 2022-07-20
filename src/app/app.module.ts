import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { MapComponent } from './map/map.component';
import { MapListComponent } from './map-list/map-list.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    MapComponent,
    MapListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
