import ParkingService from "./parking-service";

let parkingService: ParkingService;

beforeEach(() => {
  parkingService = new ParkingService();
});
test("Deve entrar e sair do estacionamento, calculando o valor da tarifa, 10 reais por hora de permanencia", async function () {
  const plate = "AAA9999";

  const checkinDate = new Date("2025-10-01T10:00:00");
  await parkingService.checkin(plate, checkinDate);

  const checkoutDate = new Date("2025-10-01T12:00:00");
  const ticket = await parkingService.checkout(plate, checkoutDate);

  expect(ticket.price).toBe(20);
});

test("Não lançar um erro caso caso um carro não encontrado tente sair do estacionamento", async function () {
  await expect(() =>
    parkingService.checkout("AAA9999", new Date("2025-10-01T10:00:00"))
  ).rejects.toThrow("Car not found");
});

test("Não deve entrar carro com placa inválida", async function () {
  const plate = "AA99";
  const checkinDate = new Date("2025-10-01T10:00:00");

  await expect(() =>
    parkingService.checkin(plate, checkinDate)
  ).rejects.toThrow("Invalid plate");
});

test("Não deve entrar carro antes da abertura do estacionamento", async function () {
  const plate = "AAA9999";
  const checkinDate = new Date("2025-10-01T07:00:00");
  await expect(() =>
    parkingService.checkin(plate, checkinDate)
  ).rejects.toThrow("Parking lot is closed");
});

test("Não deve entrar carro depois do fechamento do estacionamento", async function () {
  const plate = "AAA9999";
  const checkinDate = new Date("2025-10-01T07:00:00");
  await expect(() =>
    parkingService.checkin(plate, checkinDate)
  ).rejects.toThrow("Parking lot is closed");
});
