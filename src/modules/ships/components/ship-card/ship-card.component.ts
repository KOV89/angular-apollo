import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteHistoryService } from '../../../../services/route-history.service';
import { ShipById, ShipService } from '../../../../services/graphql/ship.service';
import { ShipMission } from '../../../../models/ship';


@Component({
  selector: 'app-ship-card',
  templateUrl: './ship-card.component.html',
  styleUrls: ['./ship-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShipCardComponent {
  ship: ShipById | undefined;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly history: RouteHistoryService,
    private readonly shipsService: ShipService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.loadShip(this.route.snapshot.paramMap.get('id')!);
  }

  loadShip(id: string): void {
    this.shipsService.getShipById(id).subscribe({
      next: (ship) => {
        if (ship) {
          this.ship = ship;
          this.cdr.detectChanges();
        } else {
          this.router.navigateByUrl('/ship').then();
        }
      },
      error: (_) => {
        this.router.navigateByUrl('/ship').then();
      }
    })
  }

  goBack(): void {
    this.router.navigateByUrl(this.history.getPreviousShipsUrl()).then();
  }

  getMissions(): string {
    if (this.ship && this.ship.missions) {
      const str = this.ship.missions
        .map((mission: ShipMission) => mission.name)
        .join(', ');
      return str?.length ? str : '-';
    } else {
      return '-';
    }
  }
}
