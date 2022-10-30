import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-selector [page]',
  templateUrl: './page-selector.component.html',
  styleUrls: ['./page-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageSelectorComponent {
  disableButtons: boolean = false;

  @Input()
  page!: number;

  @Input()
  lastPage: number = 0;

  @Input()
  disableTime: number = 400;

  @Output()
  pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private readonly cdr: ChangeDetectorRef) { }

  increment(): void {
    this.page++;
    this.onClick();
  }

  decrement(): void {
    this.page--;
    this.onClick();
  }

  private onClick(): void {
    this.disableButtons = true;
    this.pageChange.emit(this.page)
    setTimeout(() => {
      this.disableButtons = false;
      this.cdr.detectChanges();
    }, this.disableTime);
  }
}
