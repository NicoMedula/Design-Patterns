// Interfaz del Estado
interface State {
  pressSwitch(context: LampContext): void;
  showState(): void;
}

// Contexto
class LampContext {
  private state: State;

  constructor() {
    this.state = new OffState(); // Estado inicial
  }

  setState(state: State) {
    this.state = state;
  }

  pressSwitch() {
    this.state.pressSwitch(this);
  }

  showState() {
    this.state.showState();
  }
}

// Estado Apagado
class OffState implements State {
  pressSwitch(context: LampContext): void {
    console.log("Cambiando a estado ENCENDIDO");
    context.setState(new OnState());
  }

  showState(): void {
    console.log("💤 La lámpara está apagada");
  }
}

// Estado Encendido
class OnState implements State {
  pressSwitch(context: LampContext): void {
    console.log("Cambiando a estado INTERMITENTE");
    context.setState(new BlinkingState());
  }

  showState(): void {
    console.log("💡 La lámpara está encendida");
  }
}

// Estado Intermitente
class BlinkingState implements State {
  pressSwitch(context: LampContext): void {
    console.log("Cambiando a estado APAGADO");
    context.setState(new OffState());
  }

  showState(): void {
    console.log("✨ La lámpara está intermitente");
  }
}

// Uso
const lamp = new LampContext();

lamp.showState();     // Apagada
lamp.pressSwitch();   // → Encendida
lamp.showState();
lamp.pressSwitch();   // → Intermitente
lamp.showState();
lamp.pressSwitch();   // → Apagada otra vez
lamp.showState();
