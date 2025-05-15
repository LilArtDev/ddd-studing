export default class ParkingService {
  parkedCars: any = {};

  async checkin(plate: string, checkinDate: Date) {
    if (!plate.match(/^[A-Z]{3}[0-9]{4}$/)) {
      throw new Error("Invalid plate");
    }

    if (checkinDate.getHours() < 8 || checkinDate.getHours() > 22) {
      throw new Error("Parking lot is closed");
    }

    const parkedCar = { plate, checkinDate };

    this.parkedCars[plate] = parkedCar;
  }

  async checkout(plate: string, checkoutDate: Date) {
    const parkedCar = this.parkedCars[plate];

    if (!parkedCar) {
      throw new Error("Car not found");
    }

    const duration =
      (checkoutDate.getTime() - parkedCar.checkinDate.getTime()) /
      (1000 * 60 * 60);
    const price = duration * 10;

    parkedCar.checkoutDate = checkoutDate;
    parkedCar.duration = duration;
    parkedCar.price = price;

    this.parkedCars[plate] = parkedCar;

    return { price };
  }
}
