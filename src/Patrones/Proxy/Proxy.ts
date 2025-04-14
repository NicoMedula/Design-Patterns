
import { Payment } from "./IPayment";

// CLASE REAL: paga en efectivo
export class Cash implements Payment {
  pay(amount: number): string {
    return `Pagando $${amount} en efectivo.`;
  }
}

// CLASE REAL: paga con tarjeta de crédito
export class CreditCard implements Payment {
  pay(amount: number): string {
    return `Pagando $${amount} con tarjeta de crédito.`;
  }
}

// CLASE PROXY: intercepta y valida antes de realizar el pago real
export class PaymentProxy implements Payment {
  private realPayment: Payment;

  constructor(realPayment: Payment) {
    this.realPayment = realPayment;
  }

  pay(amount: number): string {
    // Validación previa
    if (amount <= 0) {
      return "El monto debe ser mayor a cero.";
    }

    // Delegación del pago al objeto real (Cash o CreditCard)
    const resultado = this.realPayment.pay(amount);

    // Lógica adicional del proxy (ejemplo: log, auditoría, etc.)
    return `${resultado} [Proxy: Pago registrado exitosamente]`;
  }
}
