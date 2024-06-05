import { Component, OnInit, inject } from '@angular/core';
import { EstudiantesService } from '../services/estudiantes.service';
import { CommonModule } from '@angular/common';
import { Estudiante } from '../interfaces/estudiante.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { parsearErroresAPI } from '../utils/Utilities';
@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.scss',
})
export class EstudiantesComponent implements OnInit {
  // Inyeccion de dependecias
  private readonly estudiantesService = inject(EstudiantesService);
  private readonly router = inject(Router);
  // Arreglo para almacenar el listado de estudiantes
  lstEstudiantes: Estudiante[];
  constructor() {
    // Es necesario inicializar el arreglo anteriormente creado
    this.lstEstudiantes = [];
  }
  ngOnInit(): void {
    this.getAllEstudiantes();
  }
  // Obtener lista de estudiantes
  getAllEstudiantes() {
    this.estudiantesService.estudiantes().subscribe({
      // Se evalua que la respuesta del endpoint sea exitosa
      next: (temp) => {
        // Se asigna la lista al arreglo anteriormente descrito
        this.lstEstudiantes = temp;
      },
      // En caso de error
      error: (err) => {
        console.log('No se pudo obtener informacion');
      },
    });
  }
  // Metodo que permite navegar al formulario para insertar estudiantes
  navigateToForm() {
    this.router.navigate(['/agregarEstudiante']);
  }
  // Eliminar un estudiante
  deleteEstudiante(event: any) {
    Swal.fire({
      title: '¿Quiere eliminar este registro?',
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.estudiantesService
          .eliminarEstudiante(event.target.value)
          .subscribe({
            // En caso exitoso
            next: (temp) => {
              Swal.fire('Eliminado', 'Registro eliminado con exito', 'success');
              // Refrescamos la lista de estudiantes
              this.getAllEstudiantes();
            },
            // En caso erroneo
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Error al eliminar',
                text: parsearErroresAPI(err).toString(),
              });
            },
          });
      }
    });
  }
  /*** Metodo que permite viajar al componente para agregar un estudiante (pero en
modo edicion).*/

  updateEstudiante(valor: number) {
    // Viajando al componente agregar estudiante
    // Primero se valida que exista un valor (es decir que sea distinto de nulo)
    if (valor) {
      // Como puede notar, ahora se anexa un valor a la redireccion. Ej. /agregarEstudiante/3;
      this.router.navigate(['/agregarEstudiante', valor]);
    }
  }
}
