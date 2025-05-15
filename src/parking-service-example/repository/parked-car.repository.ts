import { ParkedCar } from "../domain/parked-car";

export interface ParkedCarRepository {
  get(plate: string): Promise<ParkedCar | null>;
  save(parkedCar: ParkedCar): Promise<void>;
  update(plate: string, parkedCar: ParkedCar): Promise<void>;
}
