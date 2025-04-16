// Interfaz del Estado
// Define las operaciones que deben implementar los diferentes estados de la lámpara.
export interface State {
    pressSwitch(context: LampContext): void;
    showState(): void;
  }
  
  // Clase Contexto
  // Representa el objeto principal (la lámpara) que cambia su comportamiento dependiendo del estado actual.
  export class LampContext {
    private state: State;
  
    constructor() {
      // Estado inicial: apagado
      this.state = new OffState();
    }
  
    // Permite cambiar el estado de la lámpara
    setState(state: State): void {
      this.state = state;
    }
  
    // Delegamos la acción de presionar el interruptor al estado actual
    pressSwitch(): void {
      this.state.pressSwitch(this);
    }
  
    // Delegamos la acción de mostrar el estado actual al propio estado
    showState(): void {
      this.state.showState();
    }
  }
  
  // Estado Apagado
  // Implementa el comportamiento de la lámpara cuando está apagada.
  export class OffState implements State {
    pressSwitch(context: LampContext): void {
      console.log("Cambiando a estado ENCENDIDO");
      context.setState(new OnState());
    }
  
    showState(): void {
      console.log("La lámpara está apagada");
    }
  }
  
  // Estado Encendido
  // Implementa el comportamiento de la lámpara cuando está encendida.
  export class OnState implements State {
    pressSwitch(context: LampContext): void {
      console.log("Cambiando a estado INTERMITENTE");
      context.setState(new BlinkingState());
    }
  
    showState(): void {
      console.log("La lámpara está encendida");
    }
  }
  
  // Estado Intermitente
  // Implementa el comportamiento de la lámpara cuando está parpadeando.
  export class BlinkingState implements State {
    pressSwitch(context: LampContext): void {
      console.log("Cambiando a estado APAGADO");
      context.setState(new OffState());
    }
  
    showState(): void {
      console.log("La lámpara está intermitente");
    }
  }
  