import { environment } from '../../environments/environment.development';

export const ENDPOINTS = {
  agregarEstudiante: environment.serverUrl
  .concat('/api/estudiantes/agregarEstudiante'),
  actualizarEstudiante: environment.serverUrl
  .concat('/api/estudiantes/actualizarEstudiante/:id'),
  eliminarEstudiante: environment.serverUrl
  .concat('/api/estudiantes/eliminarEstudiante/:id'),
  obtenerEstudiantes: environment.serverUrl
  .concat('/api/estudiantes/ConsultarEstudiante/:id'),
  estudiantes: environment.serverUrl
  .concat('/api/estudiantes/estudiantes'),
};
