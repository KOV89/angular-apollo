import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { debounceTime, fromEvent, merge, Subject, takeUntil, tap } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { MatRadioGroup } from '@angular/material/radio';
import { PageSelectorComponent } from '../../../shared/components/page-selector/page-selector.component';
import { ShipsByFilters, ShipService, ShipsFilters } from '../../../../services/graphql/ship.service';
import { excludeEmptyFields, objectIsEmpty } from '../../../../utils';
import { Page } from '../../../../models/page';
import { RouteUrls } from '../../../../app/app-routing.module';

@Component({
  selector: 'app-ships',
  templateUrl: './ship-list.component.html',
  styleUrls: ['./ship-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShipListComponent implements AfterViewInit, OnDestroy {
  readonly destroy$: Subject<void> = new Subject<void>()
  readonly types: string[] = ['Barge', 'Cargo', 'High Speed Craft', 'Tug'];
  readonly ports: string[] = ['Port Canaveral', 'Port of Los Angeles', 'Fort Lauderdale'];
  readonly defaultFilters: Readonly<ShipsFilters> = { name: '', type: '', home_port: [] };

  ships: Map<number, ShipsByFilters[]> = new Map<number, ShipsByFilters[]>();
  filters: ShipsFilters = { ...this.defaultFilters };
  page: number = 1;
  lastPage: number = 0;

  @ViewChild(MatSelect) portsFilter!: MatSelect;
  @ViewChild(MatRadioGroup) typeFilter!: MatRadioGroup;
  @ViewChild(PageSelectorComponent) paginator!: PageSelectorComponent;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly shipService: ShipService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        this.parseParams(params);
        this.loadPage();
    })
  }

  ngAfterViewInit(): void {
    this.subscribeToFilters();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  subscribeToFilters(): void {
    const search$ = fromEvent(document.getElementById("ship-search")!,"input")
      .pipe(debounceTime(500));
    merge(
      search$,
      this.portsFilter.selectionChange,
      this.typeFilter.change,
    ).pipe(
      tap((_) => {
        this.ships.clear();
        this.page = 1;
      }),
      stream$ => merge(stream$, this.paginator.pageChange),
      takeUntil(this.destroy$)
    ).subscribe((_) => this.updateParams());
  }

  updateParams(): void {
    let params: Page & Partial<ShipsFilters> = excludeEmptyFields(this.filters);
    if (this.page !== 1) {
      params = { page: this.page, ...params }
    }
    this.router.navigate([ RouteUrls.ships  ], { queryParams: params }).then();
  }

  parseParams(params: Params): void {
    this.page = params['page'] ?? 1;
    this.filters.name = params['name'] ?? this.defaultFilters.name;
    this.filters.type = params['type'] ?? this.defaultFilters.type;
    this.filters.home_port = params['home_port']
      ? (Array.isArray(params['home_port']) ? params['home_port'] : [ params['home_port'] ])
      : this.defaultFilters.home_port;
  }

  loadPage(): void {
    if (!this.ships.has(this.page)) {
      this.shipService.getShips(this.page, this.filters).subscribe((ships: ShipsByFilters[]) => {
        this.ships.set(this.page, ships);
        ships.length < 5
          ? this.lastPage = this.page
          : this.lastPage = 0;
        this.cdr.detectChanges();
      })
    } else {
      this.cdr.detectChanges();
    }
  }

  isFilterActive(): boolean {
    return !objectIsEmpty(this.filters);
  }

  clearFilters(): void {
    this.filters = { ...this.defaultFilters };
    this.ships.clear();
    this.page = 1;
    this.updateParams();
  }
}
