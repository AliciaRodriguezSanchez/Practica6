import { Component, effect, inject, input, signal } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersServise } from '../../services/users.servise';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  id = input<string | null>(null);
  user = signal<IUser | null>(null);

  private usersServices = inject(UsersServise);

  constructor() {
    effect(() => {
      const userId = this.id();
      if (!userId) {
        this.user.set(null);
        return;
      }
      this.loadUser(userId);
    });
  }

  private async loadUser(userId: string): Promise<void> {
    try {
      const response = await this.usersServices.getAllUserByIdPromise(userId);
      console.log(response)
      this.user.set(response);
    } catch (error) {
      this.user.set(null);
      console.error('Error cargando usuario:', error);
    }
  }
}
