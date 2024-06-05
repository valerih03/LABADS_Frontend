import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ENDPOINTS } from '../utils/endponts';
import { Estudiante } from '../interfaces/estudiante.interface';
@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  private readonly http = inject(HttpClient);
  constructor() {}
  // Obtener lista de estudiantes
  estudiantes() {
    return this.http.get<Estudiante[]>(ENDPOINTS.estudiantes);
  }
  // Obtener estudiante por ID
  obtenerEstudiantes(id: number) {
    return this.http.get<Estudiante>(
      ENDPOINTS.obtenerEstudiantes.replace(':id', id.toString())
    );
  }
  // Insertar estudiante
  agregarEstudiante(estudiante: Estudiante) {
    // Se arma el objeto a enviar
    let body = {
      nombre: estudiante.nombre,
      apellido: estudiante.apellido,
      codigo: estudiante.codigo,
      correo: estudiante.correo,
    };
    return this.http.post<any>(ENDPOINTS.agregarEstudiante, body);
  }
  // Eliminar un estudiante
  eliminarEstudiante(id: number) {
    return this.http.delete<any>(
      ENDPOINTS.eliminarEstudiante.replace(':id', id.toString())
    );
  }

  // Actualizar estudiante
  actualizarEstudiante(id: number, estudiante: Estudiante) {
    // Se arma el objeto a enviar
    let body = {
      idEstudiante: estudiante.idEstudiante,
      nombre: estudiante.nombre,
      apellido: estudiante.apellido,
      codigo: estudiante.codigo,
      correo: estudiante.correo,
    };
    return this.http.patch<number>(
      ENDPOINTS.actualizarEstudiante.replace(':id', id.toString()),
      body
    );
  }
}
