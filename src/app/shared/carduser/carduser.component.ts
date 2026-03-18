import { Component , input, inject} from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-carduser',
  imports: [RouterLink],
  templateUrl: './carduser.component.html',
  styleUrl: './carduser.component.css',
})
export class CarduserComponent {
  user = input.required<IUser>();
  alertServices = inject(AlertService);

  confirmDelete(user: IUser): void {
    this.alertServices.confirmDelete(user.first_name)
      .then(result => {
        if (result.isConfirmed) { 
          console.log('Usuario eliminado');
          this.alertServices.success('Usuario eliminado correctamente');
        }
      });
  }

  
}
  
  
