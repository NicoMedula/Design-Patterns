// INTERFAZ: todos los métodos de pago implementan esta interfaz
export interface Payment {
    pay(amount: number): string;
  }
  