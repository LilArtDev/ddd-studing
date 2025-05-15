export class Period {
  constructor(private start: Date, private end: Date) {}

  public getDurationInHours() {
    return this.end.getHours() - this.start.getHours();
  }

  public isOutOfPeriod(date: Date) {
    if (date.getTime() < this.start.getTime()) return true;
    if (date.getTime() > this.end.getTime()) return true;

    return false;
  }
}
