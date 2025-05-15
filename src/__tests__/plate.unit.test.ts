import { Plate } from "domain/plate";

test("Deve criar corretamente", () => {
  const plate = new Plate("FAE2204");
  expect(plate.value).toBe("FAE2204");
});

test("Não deve criar se a placa for inválida", () => {
  expect(() => new Plate("AA1")).toThrow("Invalid plate");
});
