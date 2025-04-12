import { Guerrero, Mago, Arquero, PocionCuracion } from './Visitor';

describe('Patrón Visitor - Poción de curación', () => {
  test('El guerrero recupera 30 de vida', () => {
    const guerrero = new Guerrero(70);
    const pocion = new PocionCuracion();

    guerrero.aceptar(pocion);
    expect(guerrero.vida).toBe(100);
  });

  test('El mago recupera 50 de vida', () => {
    const mago = new Mago(40);
    const pocion = new PocionCuracion();

    mago.aceptar(pocion);
    expect(mago.vida).toBe(90);
  });

  test('El arquero recupera 40 de vida', () => {
    const arquero = new Arquero(60);
    const pocion = new PocionCuracion();

    arquero.aceptar(pocion);
    expect(arquero.vida).toBe(100);
  });
});
