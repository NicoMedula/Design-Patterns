/**
 * Tests unitarios para el patrón Proxy usando Jest
 */
import { BaseDeDatosProxy } from './Proxy'; // Asegúrate de que la ruta sea correcta

// Mock para console.log para evitar salida durante las pruebas
jest.spyOn(console, 'log').mockImplementation(() => {});

describe('BaseDeDatosProxy', () => {
  // Test de autenticación exitosa
  test('debe autenticar correctamente con credenciales válidas', () => {
    const proxy = new BaseDeDatosProxy('admin', 'secreto');
    expect(proxy.autenticar()).toBe(true);
  });

  // Test de autenticación fallida
  test('debe rechazar la autenticación con credenciales inválidas', () => {
    const proxy = new BaseDeDatosProxy('usuario', 'contraseñaIncorrecta');
    expect(proxy.autenticar()).toBe(false);
  });

  // Test de ejecución de consulta con autenticación correcta
  test('debe ejecutar consulta cuando el usuario está autenticado', async () => {
    const proxy = new BaseDeDatosProxy('admin', 'secreto');
    proxy.autenticar();
    
    const resultados = await proxy.ejecutarConsulta('SELECT * FROM usuarios');
    expect(resultados).toEqual(['resultado1', 'resultado2', 'resultado3']);
    
    const registros = proxy.obtenerRegistroOperaciones();
    expect(registros.length).toBe(1);
    expect(registros[0]).toContain('Consulta: SELECT * FROM usuarios');
  });

  // Test de rechazo de consulta insegura
  test('debe rechazar consultas inseguras', async () => {
    const proxy = new BaseDeDatosProxy('admin', 'secreto');
    proxy.autenticar();
    
    await expect(proxy.ejecutarConsulta('DROP TABLE usuarios'))
      .rejects
      .toThrow('Consulta rechazada por motivos de seguridad');
  });

  // Test de inserción de registro
  test('debe insertar registro correctamente', async () => {
    const proxy = new BaseDeDatosProxy('admin', 'secreto');
    proxy.autenticar();
    
    const resultado = await proxy.insertarRegistro('usuarios', { id: 1, nombre: 'Juan' });
    expect(resultado).toBe(true);
    
    const registros = proxy.obtenerRegistroOperaciones();
    expect(registros.length).toBe(1);
    expect(registros[0]).toContain('Inserción en tabla usuarios');
  });

  // Test de denegación de acceso sin autenticación
  test('debe denegar acceso a ejecutarConsulta sin autenticación', async () => {
    const proxy = new BaseDeDatosProxy('usuario', 'contraseñaIncorrecta');
    
    await expect(proxy.ejecutarConsulta('SELECT * FROM usuarios'))
      .rejects
      .toThrow('Acceso denegado: Usuario no autenticado');
  });
});