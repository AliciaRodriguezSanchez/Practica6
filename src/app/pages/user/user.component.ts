import { Component, effect, inject, input, signal } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersServise } from '../../services/users.servise';
import { Router, RouterLink } from '@angular/router';
import { AlertService } from '../../services/alert.service';

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
  private alertServices = inject(AlertService);
  private router = inject(Router);

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
  async deleteUser(user: IUser): Promise<void> {
    this.alertServices.openUserDeleteModal(user,() => {
      this.router.navigate(['/home']);
    });
  }

  async loadUser(userId: string): Promise<void> {
    try {
      const response = await this.usersServices.getAllUserByIdPromise(userId);
      this.user.set(response);
    } catch (error) {
      this.user.set(null);
      console.error('Error cargando usuario:', error);
    }
  }
}
