import { Period } from "parking-service-example/domain/period";

let period: Period;

beforeAll(() => {
  period = new Period(
    new Date("2025-05-01T12:00:00"),
    new Date("2025-05-01T14:00:00")
  );
});
test("Deve obter a duração de horas de um período", () => {
  expect(period.getDurationInHours()).toBe(2);
});

test("Deve retornar falso se uma data é anterior ao início do período", () => {
  expect(period.isOutOfPeriod(new Date("2025-05-01T10:00:00"))).toBe(true);
});

test("Deve retornar falso se uma data é superior ao término do período", () => {
  expect(period.isOutOfPeriod(new Date("2025-05-01T15:00:00"))).toBe(true);
});

test("Deve retornar verdadeiro se uma está dentro de um período", () => {
  expect(period.isOutOfPeriod(new Date("2025-05-01T13:00:00"))).toBe(false);
});
