import { ParkedCarRepository } from "../repository/parked-car.repository";
import { Period } from "../domain/period";

export class CheckOut {
  constructor(
    readonly workingHours: Period,
    readonly parkedCarRepository: ParkedCarRepository
  ) {}

  async execute(plate: string, checkoutDate: Date) {
    if (this.workingHours.isOutOfPeriod(checkoutDate))
      throw new Error("Parking lot is closed");

    const parkedCar = await this.parkedCarRepository.get(plate);

    if (!parkedCar) throw new Error("Car not found");

    parkedCar.checkout(checkoutDate);

    return { price: parkedCar.getPrice() };
  }
}
