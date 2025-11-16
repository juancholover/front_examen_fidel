**Backend Para Frontend Angular**

Este documento resume el backend (Spring Boot) que creé y contiene lo esencial para implementarlo desde un frontend Angular: endpoints REST, modelos TS, ejemplos de payloads, comandos para ejecutar la API y recomendaciones (CORS, errores, autenticación mínima).

**Resumen Técnico**:
- **Lenguaje / Plataforma**: Java 17, Spring Boot 3.5.7
- **Persistencia**: Spring Data JPA (Jakarta Persistence)
- **Base de datos**: PostgreSQL (configuración en `src/main/resources/application.properties`)
- **Build / Ejecutar**: Maven (wrapper incluido). Archivo principal: `upeu.edu.pe.demo.ExamenApplication`

**Cómo ejecutar el backend**
- Compilar y empaquetar:
  - En Windows (cmd):
    ```cmd
    cd C:\Users\aploi\Documents\fidel\demo
    mvnw.cmd -DskipTests package
    ```
- Ejecutar en modo desarrollo:
  - Con Maven Wrapper:
    ```cmd
    mvnw.cmd spring-boot:run
    ```
  - O con el JAR:
    ```cmd
    java -jar target\demo-0.0.1-SNAPSHOT.jar
    ```

**Configuración de la BD**
- Archivo: `src/main/resources/application.properties`
- Ejemplo (ya presente):
  ```properties
  spring.datasource.url=jdbc:postgresql://localhost:5433/back_examen
  spring.datasource.username=postgres
  spring.datasource.password=123
  spring.datasource.driver-class-name=org.postgresql.Driver
  spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
  spring.jpa.hibernate.ddl-auto=update
  ```
- Crea la base de datos `back_examen` en PostgreSQL o ajusta la URL/credenciales.

**Endpoints REST disponibles (convención CRUD)**
Todos los controladores usan rutas base `/api/{resource}` y soportan:
- `GET /api/{resource}` — listar todos
- `GET /api/{resource}/{id}` — obtener por id
- `POST /api/{resource}` — crear
- `PUT /api/{resource}/{id}` — actualizar
- `DELETE /api/{resource}/{id}` — eliminar

Recursos implementados:
- `/api/clientes` — entidad Cliente
- `/api/sanciones` — entidad Sancion
- `/api/alquileres` — entidad Alquiler
- `/api/detalle-alquiler` — entidad DetalleAlquiler
- `/api/titulos` — entidad Titulo
- `/api/cds` — entidad CD

**Modelos (campos importantes)**
- Cliente
  - `id: Long`
  - `direccion: String`
  - `telefono: String`
  - `nombre: String` (required)
  - `email: String`
  - `nroDni: String`
  - `fechaNacimiento: LocalDate` (ISO yyyy-MM-dd)
  - `fechaInscripcion: LocalDate`
  - `temaInteres: String`
  - `estado: String`

- Sancion
  - `id: Long`
  - `cliente: { id: Long }` (relación)
  - `tipoSancion: String`
  - `nroDiasSancion: Integer`

- Alquiler
  - `id: Long`
  - `cliente: { id: Long }`
  - `fechaAlquiler: LocalDate`
  - `valorAlquiler: Double`
  - `detalles: DetalleAlquiler[]`

- DetalleAlquiler
  - `id: Long`
  - `alquiler: { id: Long }`
  - `cd: { id: Long }`
  - `diasPrestamo: Integer`
  - `fechaDevolucion: LocalDate`

- Titulo
  - `id: Long`
  - `denominacion: String`
  - `anio: Integer`
  - `tema: String`
  - `productora: String`
  - `director: String`
  - `idioma: String`
  - `calificacion: String`
  - `estadoTitulo: String`

- CD
  - `id: Long`
  - `nroCd: String`
  - `condicion: String`
  - `ubicacion: String`
  - `estado: String`
  - `titulo: { id: Long }`

Nota: las entidades en el backend están mapeadas con relaciones JPA; para llamadas desde Angular es recomendable enviar/recibir solo los IDs de las relaciones (ej. `cliente: { id: 1 }`) o crear DTOs que representen formas más planas.

**Ejemplos de payload (JSON) para POST / PUT**
- Crear Cliente:
  ```json
  {
    "nombre": "Juan Perez",
    "direccion": "Calle Falsa 123",
    "telefono": "999999999",
    "email": "juan@example.com",
    "nroDni": "12345678",
    "fechaNacimiento": "1990-01-01",
    "fechaInscripcion": "2025-11-15",
    "temaInteres": "rock",
    "estado": "activo"
  }
  ```

- Crear Alquiler (enviar referencia a cliente por id):
  ```json
  {
    "cliente": { "id": 1 },
    "fechaAlquiler": "2025-11-15",
    "valorAlquiler": 15.0
  }
  ```

- Crear DetalleAlquiler (referenciar alquiler y cd por id):
  ```json
  {
    "alquiler": { "id": 1 },
    "cd": { "id": 2 },
    "diasPrestamo": 5,
    "fechaDevolucion": "2025-11-20"
  }
  ```

**CORS**
- Si tu frontend Angular corre en otro origen (ej. `http://localhost:4200`), habilita CORS globalmente o por controlador. Ejemplo de bean en Spring:
  ```java
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**").allowedOrigins("http://localhost:4200");
      }
    };
  }
  ```

**Integración Angular — modelos TypeScript**
- `src/app/models/cliente.ts`
  ```ts
  export interface Cliente {
    id?: number;
    direccion?: string;
    telefono?: string;
    nombre: string;
    email?: string;
    nroDni?: string;
    fechaNacimiento?: string; // ISO
    fechaInscripcion?: string;
    temaInteres?: string;
    estado?: string;
  }
  ```

- `src/app/models/alquiler.ts`
  ```ts
  import { Cliente } from './cliente';
  import { DetalleAlquiler } from './detalle-alquiler';

  export interface Alquiler {
    id?: number;
    cliente?: { id: number } | Cliente;
    fechaAlquiler?: string;
    valorAlquiler?: number;
    detalles?: DetalleAlquiler[];
  }
  ```

**Ejemplo de servicio Angular (CRUD) usando HttpClient**
- `src/app/services/cliente.service.ts`
  ```ts
  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { Cliente } from '../models/cliente';

  const BASE = 'http://localhost:8080/api/clientes';

  @Injectable({ providedIn: 'root' })
  export class ClienteService {
    constructor(private http: HttpClient) {}
    getAll(): Observable<Cliente[]> { return this.http.get<Cliente[]>(BASE); }
    getById(id: number) { return this.http.get<Cliente>(`${BASE}/${id}`); }
    create(c: Cliente) { return this.http.post<Cliente>(BASE, c); }
    update(id: number, c: Cliente) { return this.http.put<Cliente>(`${BASE}/${id}`, c); }
    delete(id: number) { return this.http.delete(`${BASE}/${id}`); }
  }
  ```

**Recomendaciones para el frontend**
- Usar `HttpClient` y manejar errores con `catchError` de RxJS.
- Cuando envíes relaciones, manda solo `{ id: number }` para evitar ciclos JSON grandes.
- Implementa validación en formulario (Reactive Forms) y valida en backend también.
- Considera crear DTOs en backend para devolver vistas planas (excluir relaciones innecesarias).

**Pruebas rápidas / Curl**
- Listar clientes:
  ```bash
  curl http://localhost:8080/api/clientes
  ```
- Crear cliente:
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"nombre":"Ana"}' http://localhost:8080/api/clientes
  ```

**Notas finales / Siguientes pasos**
- Actualmente no hay autenticación ni paginación; si el frontend lo requiere, recomiendo añadir JWT + Spring Security y endpoints paginados (`Pageable`) en los repositorios.
- Opcional: documentar API con OpenAPI / SpringDoc para generar un swagger y facilitar al equipo frontend.

Si quieres, genero ejemplos de interfaces TS para todas las entidades, un servicio Angular por cada recurso, y/o un pequeño proyecto Angular de ejemplo con llamadas a la API (especifica qué deseas primero).

***
Archivo generado automáticamente por la integración. Si quieres que lo coloque en otro nombre o formato (`README.md`) dímelo.
