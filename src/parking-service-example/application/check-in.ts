import { ParkedCar } from "../domain/parked-car";
import { ParkedCarRepository } from "../repository/parked-car.repository";
import { Period } from "../domain/period";

export class CheckIn {
  constructor(readonly workingHours: Period, readonly parkedCarRepository: ParkedCarRepository) {}

  async execute(plate: string, checkinDate: Date) {
    if(this.workingHours.isOutOfPeriod(checkinDate)) throw new Error('Parking lot is closed')
    const parkedCar = new ParkedCar(plate, checkinDate);
    await this.parkedCarRepository.save(parkedCar);
  }
}
