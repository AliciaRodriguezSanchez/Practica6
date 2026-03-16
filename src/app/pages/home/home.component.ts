import { Component , inject, signal} from '@angular/core';
import { CarduserComponent } from '../../shared/carduser/carduser.component';
import { UsersServise } from '../../services/users.servise';
import { IUser } from '../../interfaces/iuser.interface';


@Component({
  selector: 'app-home',
  imports: [CarduserComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  usersServices = inject(UsersServise);
  users = signal<IUser[]>([]);

 async ngOnInit() {
    try {
      this.users.set(await this.usersServices.getAllUserPromise());
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    }
  }

}
