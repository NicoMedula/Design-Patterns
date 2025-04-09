// src/Payment.test.ts

import { Cash, CreditCard, PaymentProxy } from "./Proxy";

describe("Patrón Proxy - Pagos", () => {
  test("Pago en efectivo válido", () => {
    const efectivo = new PaymentProxy(new Cash());
    expect(efectivo.pay(100)).toBe(
      "Pagando $100 en efectivo. [Proxy: Pago registrado exitosamente]"
    );
  });

  test("Pago con tarjeta válido", () => {
    const tarjeta = new PaymentProxy(new CreditCard());
    expect(tarjeta.pay(200)).toBe(
      "Pagando $200 con tarjeta de crédito. [Proxy: Pago registrado exitosamente]"
    );
  });

  test("Monto inválido (0 o negativo)", () => {
    const tarjeta = new PaymentProxy(new CreditCard());
    expect(tarjeta.pay(0)).toBe("El monto debe ser mayor a cero.");
  });
});
