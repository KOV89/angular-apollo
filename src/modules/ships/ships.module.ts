import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ShipsRoutingModule } from './ships-routing.module';
import { ShipListComponent } from './components/ship-list/ship-list.component';
import { ShipCardComponent } from './components/ship-card/ship-card.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    ShipListComponent,
    ShipCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShipsRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatProgressSpinnerModule,
  ]
})
export class ShipsModule { }
