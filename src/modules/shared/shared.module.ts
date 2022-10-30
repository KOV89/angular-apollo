import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageSelectorComponent } from './components/page-selector/page-selector.component';
import { InfoCellComponent } from './components/info-cell/info-cell.component';

@NgModule({
  declarations: [
    PageSelectorComponent,
    InfoCellComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PageSelectorComponent,
    InfoCellComponent
  ]
})
export class SharedModule { }
