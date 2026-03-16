import { Component , inject, input} from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersServise } from '../../services/users.servise';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  id = input.required<number>();
  user : IUser | null = null;
  
  usersServices = inject(UsersServise);
  
  async ngOnInit() {
    const userId = this.id();
    this.user = await this.usersServices.getAllUserByIdPromise(userId)

  }
}