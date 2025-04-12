// Interfaz del visitante
export interface VisitantePersonaje {
    visitarGuerrero(guerrero: Guerrero): void;
    visitarMago(mago: Mago): void;
    visitarArquero(arquero: Arquero): void;
  }
  
  // Interfaz de personaje
  export interface Personaje {
    vida: number;
    aceptar(visitante: VisitantePersonaje): void;
  }
  
  // Clases concretas de personajes
  export class Guerrero implements Personaje {
    constructor(public vida: number) {}
  
    aceptar(visitante: VisitantePersonaje): void {
      visitante.visitarGuerrero(this);
    }
  }
  
  export class Mago implements Personaje {
    constructor(public vida: number) {}
  
    aceptar(visitante: VisitantePersonaje): void {
      visitante.visitarMago(this);
    }
  }
  
  export class Arquero implements Personaje {
    constructor(public vida: number) {}
  
    aceptar(visitante: VisitantePersonaje): void {
      visitante.visitarArquero(this);
    }
  }
  
  // Visitante concreto: Poción de curación
  export class PocionCuracion implements VisitantePersonaje {
    visitarGuerrero(guerrero: Guerrero): void {
      guerrero.vida += 30;
    }
  
    visitarMago(mago: Mago): void {
      mago.vida += 50;
    }
  
    visitarArquero(arquero: Arquero): void {
      arquero.vida += 40;
    }
  }
  