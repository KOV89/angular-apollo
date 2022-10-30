import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipListComponent } from './components/ship-list/ship-list.component';
import { ShipCardComponent } from './components/ship-card/ship-card.component';


const routes: Routes = [
  {
    path: '',
    component: ShipListComponent,
  },
  {
    path: ':id',
    component: ShipCardComponent
  },
  {
    path: '**', redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipsRoutingModule { }
