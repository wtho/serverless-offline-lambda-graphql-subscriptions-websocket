import { Vehicle } from './schema';
import { pubSub } from './ws-management';

const vehicles: Vehicle[] = [
  { numberPlate: '325529-3295', color: 'green', numberOfPassengers: 5 },
  { numberPlate: '294-4202419', color: 'blue', numberOfPassengers: 8 },
  { numberPlate: '3529024-124', color: 'red', numberOfPassengers: 4 },
]

export function getVehicle(inputNumberPlate: string) {
  return vehicles.find(({ numberPlate }) => numberPlate === inputNumberPlate)
}
export function changeVehicleColor(inputNumberPlate: string, newColor: string) {
  const vehicle = vehicles.find(({ numberPlate }) => numberPlate === inputNumberPlate)
  if (vehicle) {
    vehicle.color = newColor;
    console.log('update vehicle color', vehicle)

    pubSub.publish(`vehicle--${vehicle.numberPlate}`, { vehicle })
    return vehicle;
  }
  return null;
}
export function getVehicles() {
  return vehicles;
}
