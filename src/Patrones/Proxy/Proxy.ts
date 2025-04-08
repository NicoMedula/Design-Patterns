/**
 * Patrón de Diseño Proxy en TypeScript
 * 
 * Este código implementa el patrón Proxy para controlar el acceso a un servicio
 * de base de datos. El proxy realiza validaciones y registra operaciones antes
 * de permitir el acceso al servicio real.
 */

// Interfaz común que implementarán tanto el servicio real como el proxy
interface BaseDeDatosServicio {
    ejecutarConsulta(consulta: string): Promise<string[]>;
    insertarRegistro(tabla: string, datos: object): Promise<boolean>;
  }
  
  // Servicio real que realiza operaciones en la base de datos
  class BaseDeDatosReal implements BaseDeDatosServicio {
    public async ejecutarConsulta(consulta: string): Promise<string[]> {
      console.log(`Ejecutando consulta: ${consulta}`);
      // Simula una consulta a la base de datos
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(['resultado1', 'resultado2', 'resultado3']);
        }, 500);
      });
    }
  
    public async insertarRegistro(tabla: string, datos: object): Promise<boolean> {
      console.log(`Insertando en tabla ${tabla}: ${JSON.stringify(datos)}`);
      // Simula una inserción en la base de datos
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 500);
      });
    }
  }
  
  // Proxy que controla el acceso al servicio real
  class BaseDeDatosProxy implements BaseDeDatosServicio {
    private servicio: BaseDeDatosReal;
    private estaAutenticado: boolean = false;
    private registroOperaciones: string[] = [];
  
    constructor(private usuario: string, private contraseña: string) {
      this.servicio = new BaseDeDatosReal();
    }
  
    // Método para autenticar al usuario
    public autenticar(): boolean {
      // En un caso real, verificaríamos credenciales contra un sistema de autenticación
      this.estaAutenticado = this.usuario === 'admin' && this.contraseña === 'secreto';
      return this.estaAutenticado;
    }
  
    // Método para verificar si una consulta es segura (ejemplo básico)
    private esConsultaSegura(consulta: string): boolean {
      const palabrasProhibidas = ['DROP', 'DELETE', 'TRUNCATE'];
      return !palabrasProhibidas.some(palabra => 
        consulta.toUpperCase().includes(palabra)
      );
    }
  
    // Implementación del método de la interfaz con controles adicionales
    public async ejecutarConsulta(consulta: string): Promise<string[]> {
      // Verificar autenticación
      if (!this.estaAutenticado) {
        await this.autenticar();
        if (!this.estaAutenticado) {
          throw new Error('Acceso denegado: Usuario no autenticado');
        }
      }
  
      // Verificar seguridad de la consulta
      if (!this.esConsultaSegura(consulta)) {
        throw new Error('Consulta rechazada por motivos de seguridad');
      }
  
      // Registrar la operación
      const timestamp = new Date().toISOString();
      this.registroOperaciones.push(`${timestamp}: Consulta: ${consulta}`);
      
      // Delegar al servicio real
      return this.servicio.ejecutarConsulta(consulta);
    }
  
    // Implementación del método de la interfaz con controles adicionales
    public async insertarRegistro(tabla: string, datos: object): Promise<boolean> {
      // Verificar autenticación
      if (!this.estaAutenticado) {
        await this.autenticar();
        if (!this.estaAutenticado) {
          throw new Error('Acceso denegado: Usuario no autenticado');
        }
      }
  
      // Registrar la operación
      const timestamp = new Date().toISOString();
      this.registroOperaciones.push(`${timestamp}: Inserción en tabla ${tabla}`);
      
      // Delegar al servicio real
      return this.servicio.insertarRegistro(tabla, datos);
    }
  
    // Método adicional para obtener el registro de operaciones
    public obtenerRegistroOperaciones(): string[] {
      return [...this.registroOperaciones];
    }
  }
  
  // Exportamos las clases para poder importarlas en los tests
  export { BaseDeDatosServicio, BaseDeDatosReal, BaseDeDatosProxy };