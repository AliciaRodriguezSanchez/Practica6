import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersServise } from '../../services/users.servise';
import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-newuser',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './newuser.component.html',
  styleUrl: './newuser.component.css',
})
export class NewuserComponent {
  private usersServices = inject(UsersServise);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private routeParamMap = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });

  id = computed(() => this.routeParamMap().get('id'));
  form = this.fb.nonNullable.group({
    _id: '',
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    image: '',
  });
  alertServices = inject(AlertService);

  constructor() {
    effect(() => {
      const userId = this.id();
      if (!userId) {
        this.form.reset(this.createEmptyUser());
        return;
      }
      void this.loadUser(userId);
    });
  }

  saveUser() {
    console.log(this.form.getRawValue());
  }

  async deleteUser(): Promise<void> {
    const user = this.form.getRawValue();
    const result = await this.alertServices.confirmDelete(user.first_name);
    if (!result.isConfirmed) {
      return;
    }

    try {
      await this.usersServices.removeUser(user._id);
      await this.alertServices.success('Usuario eliminado correctamente');
      await this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error eliminando usuario:', error);
      await this.alertServices.error('No se pudo eliminar el usuario');
    }
  }


  async loadUser(userId: string): Promise<void> {
    try {
      const response = await this.usersServices.getAllUserByIdPromise(userId);
      this.form.reset(response);
    } catch (error) {
      console.error('Error cargando usuario para editar:', error);
      this.form.reset(this.createEmptyUser());
    }
  }

  private createEmptyUser(): IUser {
    return {
      _id: '',
      id: 0,
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      image: '',
    };
  }
}
