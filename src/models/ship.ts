export interface Ship {
  active: Boolean
  home_port: string
  id: string
  image: string
  missions: ShipMission[]
  mmsi: number
  model: string
  name: string
  roles: string[]
  status: string
  type: string
  url: string
  weight_kg: number
  weight_lbs: number
  year_built: number
  abs: number
  attempted_landings: number
  position: ShipLocation
  class: number
  course_deg: number
  imo: number
  speed_kn: number
  successful_landings: number
}

export interface ShipMission {
  flight: string
  name: string
}

export interface ShipLocation {
  latitude: number
  longitude: number
}
