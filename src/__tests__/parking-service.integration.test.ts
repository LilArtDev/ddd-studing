import { CheckIn } from "../application/check-in";
import { CheckOut } from "../application/check-out";
import { ParkedCarMemoryRepository } from "../infra/parked-car-memory.repository";
import { Period } from "../domain/period";

let checkIn: CheckIn;
let checkOut: CheckOut;

beforeEach(() => {
  const workingHours = new Period(
    new Date("2025-10-01T08:00:00"),
    new Date("2025-10-01T22:00:00")
  );
  const parkedCarRepository = new ParkedCarMemoryRepository();

  checkIn = new CheckIn(workingHours, parkedCarRepository);
  checkOut = new CheckOut(workingHours, parkedCarRepository);
});
test("Deve entrar e sair do estacionamento, calculando o valor da tarifa, 10 reais por hora de permanencia", async function () {
  const plate = "AAA9999";

  const checkinDate = new Date("2025-10-01T10:00:00");
  await checkIn.execute(plate, checkinDate);

  const checkoutDate = new Date("2025-10-01T12:00:00");
  const ticket = await checkOut.execute(plate, checkoutDate);

  expect(ticket.price).toBe(20);
});

test("Não deve lançar um erro caso caso um carro não encontrado tente sair do estacionamento", async function () {
  await expect(() =>
    checkOut.execute("AAA9999", new Date("2025-10-01T10:00:00"))
  ).rejects.toThrow("Car not found");
});

test("Não deve entrar carro com placa inválida", async function () {
  const plate = "AA99";
  const checkinDate = new Date("2025-10-01T10:00:00");

  await expect(() =>
    checkIn.execute(plate, checkinDate)
  ).rejects.toThrow("Invalid plate");
});

test("Não deve entrar carro antes da abertura do estacionamento", async function () {
  const plate = "AAA9999";
  const checkinDate = new Date("2025-10-01T07:00:00");
  await expect(() =>
    checkIn.execute(plate, checkinDate)
  ).rejects.toThrow("Parking lot is closed");
});

test("Não deve entrar carro depois do fechamento do estacionamento", async function () {
  const plate = "AAA9999";
  const checkinDate = new Date("2025-10-01T07:00:00");
  await expect(() =>
    checkIn.execute(plate, checkinDate)
  ).rejects.toThrow("Parking lot is closed");
});
