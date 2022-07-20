import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {
    path: 'map/:definition',
    component: MapComponent
  },

  // TODO: temp
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/map/' + btoa(JSON.stringify({"name": "The Cursed Kiddie Pool", "map": "XXX  $\r\nX     \r\nX X   \r\nX XXXX\r\n    X!\r\n!XX   "}))
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
