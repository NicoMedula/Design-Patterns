import { LampContext } from "./State"; 

describe("Patrón State - Lámpara", () => {
  let lamp: LampContext;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    lamp = new LampContext();
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {}); // Mock de console.log
  });

  afterEach(() => {
    consoleSpy.mockRestore(); // Restaurar console.log original
  });

  test("Estado inicial debe ser apagado", () => {
    lamp.showState();
    expect(consoleSpy).toHaveBeenCalledWith("La lámpara está apagada");
  });

  test("Cambio de estado: Apagado -> Encendido", () => {
    lamp.pressSwitch();
    lamp.showState();
    expect(consoleSpy).toHaveBeenCalledWith("La lámpara está encendida");
  });

  test("Cambio de estado: Encendido -> Intermitente", () => {
    lamp.pressSwitch(); // Encendido
    lamp.pressSwitch(); // Intermitente
    lamp.showState();
    expect(consoleSpy).toHaveBeenCalledWith("La lámpara está intermitente");
  });

  test("Cambio de estado: Intermitente -> Apagado", () => {
    lamp.pressSwitch(); // Encendido
    lamp.pressSwitch(); // Intermitente
    lamp.pressSwitch(); // Apagado
    lamp.showState();
    expect(consoleSpy).toHaveBeenCalledWith("La lámpara está apagada");
  });

  test("Ciclo completo", () => {
    lamp.showState();                           // Apagado
    lamp.pressSwitch(); lamp.showState();       // Encendido
    lamp.pressSwitch(); lamp.showState();       // Intermitente
    lamp.pressSwitch(); lamp.showState();       // Apagado otra vez

    expect(consoleSpy).toHaveBeenNthCalledWith(1, "La lámpara está apagada");
    expect(consoleSpy).toHaveBeenNthCalledWith(3, "La lámpara está encendida");
    expect(consoleSpy).toHaveBeenNthCalledWith(5, "La lámpara está intermitente");
    expect(consoleSpy).toHaveBeenNthCalledWith(7, "La lámpara está apagada");
  });
});
