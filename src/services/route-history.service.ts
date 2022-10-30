import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs';
import { RouteUrls } from '../app/app-routing.module';

interface HistoryRecords {
  previousUrl?: string,
  previousShipsUrl?: string
}

/**
 * Сервис для отслеживания и сохранения переходов по внутренним ссылкам
 */
@Injectable({
  providedIn: 'root'
})
export class RouteHistoryService {
  private readonly history: HistoryRecords = {};

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event: any) => event instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        const previousUrl = events[0].urlAfterRedirects;
        this.history.previousUrl = previousUrl;
        if (previousUrl === ('/' + RouteUrls.ships) || previousUrl.startsWith('/' + RouteUrls.ships + '?')) {
          this.history.previousShipsUrl = previousUrl;
        }
      });
  }

  public getPreviousUrl(): string {
    return this.history.previousUrl ?? ('/' + RouteUrls.home);
  }

  public getPreviousShipsUrl(): string {
    return this.history.previousUrl ?? ('/' + RouteUrls.ships);
  }
}
