import { ParkedCar } from "parking-service-example/domain/parked-car";

let parkedCar: ParkedCar;

beforeEach(() => {
  parkedCar = new ParkedCar("AAA9999", new Date("2025-05-01T00:00:00"));
});

test("Deve retornar o preço correto de 10 reais por hora", () => {
  parkedCar.checkout(new Date("2025-05-01T01:00:00"));
  expect(parkedCar.getPrice()).toBe(10);
});

test("Não deve calcular preço se não tiver a duração correta", () => {
  expect(() => (parkedCar as any).calculatePrice()).toThrow(
    "A parked car cannot calculate price if does not have checkout date"
  );
});

test("Deve retornar nulo se não tiver preço", () => {
  expect(parkedCar.getPrice()).toBe(null);
});
