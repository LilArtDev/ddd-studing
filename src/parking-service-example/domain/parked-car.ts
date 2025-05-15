import { Money } from "./money";
import { Period } from "./period";
import { Plate } from "./plate";

export class ParkedCar {
  readonly plate: Plate;
  private checkinDate: Date;
  private checkoutDate?: Date;
  private duration?: Period;
  private price?: Money;

  constructor(plate: string, checkinDate: Date) {
    this.plate = new Plate(plate);
    this.checkinDate = checkinDate;
  }

  public checkout(checkoutDate: Date) {
    this.checkoutDate = checkoutDate;
    this.duration = new Period(this.checkinDate, this.checkoutDate);
    this.price = this.calculatePrice();
  }

  public getPrice(): number | null {
    return this.price?.value || null;
  }

  private calculatePrice(): Money {
    if (!this.duration)
      throw new Error(
        "A parked car cannot calculate price if does not have checkout date"
      );

    const elapsedHours = this.duration.getDurationInHours();

    return new Money(elapsedHours * 10);
  }
}
