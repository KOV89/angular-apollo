import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { Ship } from '../../models/ship';

export type ShipById = Pick<Ship, "id" | "name" | "type" | "home_port" | "year_built" | "weight_kg" | "missions">
const SHIP_BY_ID = gql`
  query ShipById($id: ID!) {
    ship(id: $id) {
      id
      name
      type
      home_port
      year_built
      weight_kg
      missions {
        name
      }
    }
  }
`

export type ShipsByFilters = Pick<Ship, "id" | "name" | "type" | "home_port">
export type ShipsFilters = Pick<Ship, "name" | "type"> & { home_port: string[]};
const SHIPS_BY_FILTERS = gql`
  query ShipsByFilters($name: String!, $type: String!, $home_port: String!, $limit: Int!, $offset: Int!) {
    ships(find: {name: $name, type: $type, home_port: $home_port}, limit: $limit, offset: $offset) {
      id
      name
      type
      home_port
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class ShipService {

  constructor(private readonly apollo: Apollo) {}

  getShipById(id: string): Observable<ShipById | null> {
    return this.apollo
      .query({
          query: SHIP_BY_ID,
          variables: { id }
        })
      .pipe(map(response => (response.data as { ship: ShipById } ).ship));
  }

  getShips(page: number = 1, filters: ShipsFilters): Observable<ShipsByFilters[]> {
    return this.apollo
      .query({
        query: SHIPS_BY_FILTERS,
        variables: { ...filters, home_port: filters.home_port[0] ?? "", limit: 5, offset: 5 * (page - 1) }
      })
      .pipe(map(response => (response.data as { ships: ShipsByFilters[] }).ships ));
  }
}

