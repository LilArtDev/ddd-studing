export class Plate {
  constructor(readonly value: string) {
    if (!value.match(/^[A-Z]{3}[0-9]{4}$/)) {
      throw new Error("Invalid plate");
    }
    this.value = value;
  }
}
