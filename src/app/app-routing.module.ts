import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapListComponent } from './map-list/map-list.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {
    path: '',
    component: MapListComponent
  },
  {
    path: 'map/:definition',
    component: MapComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
