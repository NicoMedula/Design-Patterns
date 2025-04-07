/*Ejemplo practico: Notificacion por mail y SMS
Imaginemos que tenemos un sistema que puede enviar notificaciones.
En vez de instanciar directamente una clase EmailNotification o SMSNotification */

interface INotification {
  send(mensaje:string): string;
}


// Clase Mail que implementa la interface INotification
class EmailNotification implements INotification {
  send(mensaje: string): string {
    return `Email enviado: ${mensaje}`;
  }
}

// Clase SMS que implementa la interface INotification
class SMSNotification implements INotification {
  send(mensaje: string): string {
    return `SMS enviado: ${mensaje}`;
  }
}

abstract class NotificationFactory {
  abstract createNotification(): INotification;
  
  notify(mensaje: string): string {
    const notificacion = this.createNotification();
    return notificacion.send(mensaje);
  }
}

// Clase que utiliza la factoria para crear notificaciones
class EmailNotificationFactory extends NotificationFactory {
  createNotification(): INotification {
    return new EmailNotification();
  }
}

class SMSNotificationFactory extends NotificationFactory {
    createNotification(): INotification {
    return new SMSNotification();
  }
}

// Exportación para test
export {
    INotification,
    EmailNotification,
    SMSNotification,
    NotificationFactory,
    EmailNotificationFactory,
    SMSNotificationFactory,
  };
