export class Money {
  constructor(readonly value: number) {
    if (value < 0) throw new Error("Value cannot be negative");
    this.value = value;
  }
}
