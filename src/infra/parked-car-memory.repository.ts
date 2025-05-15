import { ParkedCar } from "../domain/parked-car";
import { ParkedCarRepository } from "../repository/parked-car.repository";

export class ParkedCarMemoryRepository implements ParkedCarRepository {
  parkedCars = new Map<string, ParkedCar>();

  async get(plate: string) {
    return this.parkedCars.get(plate) || null;
  }
  async save(parkedCar: ParkedCar): Promise<void> {
    this.parkedCars.set(parkedCar.plate.value, parkedCar);
  }

  async update(plate: string, parkedCar: ParkedCar): Promise<void> {
    this.parkedCars.set(plate, parkedCar)
  }
}
