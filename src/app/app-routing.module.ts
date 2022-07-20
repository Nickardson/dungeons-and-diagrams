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
    redirectTo: '/map/eyJuYW1lIjogIlRoZSBDdXJzZWQgS2lkZGllIFBvb2wiLCAibWFwIjogIlhYWCAgJFxyXG5YICAgICBcclxuWCBYICAgXHJcblggWFhYWFxyXG4gICAgWCFcclxuIVhYICAgIn0='
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
