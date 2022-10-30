import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-cell [name]',
  templateUrl: './info-cell.component.html',
  styleUrls: ['./info-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoCellComponent {
  @Input()
  name!: string;

  @Input()
  value: string | number | undefined;

  constructor() { }
}
