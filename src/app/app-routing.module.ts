import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export enum RouteUrls {
  home = 'ships',
  ships = 'ships'
}

const routes: Routes = [
  {
    path: RouteUrls.ships,
    loadChildren: () => import('../modules/ships/ships.module').then((m) => m.ShipsModule),
  },
  {
    path: '**', redirectTo: RouteUrls.home
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
