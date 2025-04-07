import { EmailNotificationFactory, SMSNotificationFactory } from './FactoryMethod';


describe("FactoryMethod", () => {
  it("debería enviar una notificación por SMS", () => {
    const factory = new SMSNotificationFactory();
    const result = factory.notify("Hola SMS!");
    expect(result).toBe("SMS enviado: Hola SMS!");
  });

  it("debería enviar una notificación por email", () => {
    const factory = new EmailNotificationFactory();
    const result = factory.notify("Hola Email!");
    expect(result).toBe("Email enviado: Hola Email!");
  });   

  it("debería crear una instancia de EmailNotificationFactory", () => {
    const factory = new EmailNotificationFactory();
    expect(factory).toBeInstanceOf(EmailNotificationFactory);
  });

  it("debería crear una instancia de SMSNotificationFactory", () => {
    const factory = new SMSNotificationFactory();
    expect(factory).toBeInstanceOf(SMSNotificationFactory);
  });
});