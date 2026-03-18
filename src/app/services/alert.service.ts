import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  confirmDelete(name: string) {
    return Swal.fire({
      title: `¿Esta seguro de eliminar a ${name}?`,
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    });
    
  }

  success(message: string) {
    return Swal.fire(
      'Éxito',
      message,
      'success'
    );
  }


}
