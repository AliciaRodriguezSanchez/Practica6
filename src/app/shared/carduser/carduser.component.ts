import { Component , input, inject} from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { UsersServise } from '../../services/users.servise';

@Component({
  selector: 'app-carduser',
  imports: [RouterLink],
  templateUrl: './carduser.component.html',
  styleUrl: './carduser.component.css',
})
export class CarduserComponent {
  user = input.required<IUser>();
  alertServices = inject(AlertService);
  usersServices = inject(UsersServise);

  async confirmDelete(user: IUser): Promise<void> {
    const result = await this.alertServices.confirmDelete(user.first_name);
    if (!result.isConfirmed) {
      return;
    }

    try {
      await this.usersServices.removeUser(user._id);
      this.alertServices.success('Usuario eliminado correctamente');
    } catch (error) {
      console.error('Error eliminando usuario:', error);
      this.alertServices.error('No se pudo eliminar el usuario');
    }
  }

  
}
  
  
