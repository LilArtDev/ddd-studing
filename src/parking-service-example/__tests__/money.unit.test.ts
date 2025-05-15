import { Money } from "parking-service-example/domain/money";

test("Deve criar corretamente", () => {
  const money = new Money(10);
  expect(money.value).toBe(10);
});

test("Não deve criar se o valor for negativo", () => {
  expect(() => new Money(-10)).toThrow("Value cannot be negative");
});
