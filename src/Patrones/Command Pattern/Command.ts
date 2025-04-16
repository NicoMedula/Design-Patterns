// Receptor (Receiver): el que hace la acción real
class Light {
    turnOn(): string {
      return 'Luz encendida';
    }
  
    turnOff(): string {
      return 'Luz apagada';
    }
  }
  
  // Comando (Command)
  interface ICommand {
    execute(): string;
  }
  
  // Comandos concretos
  class TurnOnLightCommand implements ICommand {
    constructor(private light: Light) {}
  
    execute(): string {
      return this.light.turnOn();
    }
  }
  
  class TurnOffLightCommand implements ICommand {
    constructor(private light: Light) {}
  
    execute(): string {
      return this.light.turnOff();
    }
  }
  
  // Invocador (Invoker): ejecuta comandos sin saber detalles
  class RemoteControl {
    private command: ICommand | null = null;
  
    setCommand(command: ICommand) {
      this.command = command;
    }
  
    pressButton(): string {
      if (!this.command) throw new Error('No hay comando asignado');
      return this.command.execute();
    }
  }
  
  // Exportación para test
  export {
    Light,
    TurnOnLightCommand,
    TurnOffLightCommand,
    RemoteControl,
  };
  