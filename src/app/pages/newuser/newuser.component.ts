import { Component, effect, inject, input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { IUserApiResponseError } from '../../interfaces/iuserapiresponse.interfaces';
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
  private router = inject(Router);

  id = input<string | null>(null);

  form = new FormGroup({
    _id: new FormControl('', { nonNullable: true }),
    id: new FormControl(0, { nonNullable: true }),
    first_name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    last_name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)],
    }),
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    image: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, this.imageUrlValidator],
    }),
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

  async saveUser(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const user = this.form.getRawValue();
    try {
      if (this.id()) {
        const response = await this.usersServices.updateUser(user);
        if (response.id) {
          await this.alertServices.success('Usuario actualizado correctamente', async () => {
            await this.router.navigate(['/home']);
          });
        }
      } else {
        const response = await this.usersServices.createUser(user);
        if (response.id) {
          await this.alertServices.success('Usuario creado correctamente', async () => {
            await this.router.navigate(['/home']);
          });
        }
      }
    } catch (error: unknown) {
      const apiError = error as IUserApiResponseError;
      await this.alertServices.error(apiError.error || 'No se pudo guardar el usuario');
    }
  }

  imageUrlValidator(control: AbstractControl): { invalidImageUrl: true } | null {
    const value = control.value;

    if (!value) {
      return null;
    }

    try {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:'
        ? null
        : { invalidImageUrl: true };
    } catch {
      return { invalidImageUrl: true };
    }
  }

  checkControl(controlName: string, errorName: string): boolean {
    return !!(
      this.form.get(controlName)?.hasError(errorName) &&
      this.form.get(controlName)?.touched
    );
  }

  get imagePreview(): string {
    const imageValue = this.form.controls.image.value;
    return imageValue || 'assets/silueta.png';
  }

  async deleteUser(): Promise<void> {
    const user = this.form.getRawValue();
    this.alertServices.openUserDeleteModal(user, async () => {
      await this.router.navigate(['/home']);
    });
  }


  async loadUser(userId: string): Promise<void> {
    try {
      const response = await this.usersServices.getAllUserByIdPromise(userId);
      this.form.reset(response);
      this.form.markAsPristine();
      this.form.markAsUntouched();
      this.form.updateValueAndValidity();
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
