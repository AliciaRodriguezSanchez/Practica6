import { Injectable, inject, signal } from '@angular/core';
import { toast } from 'ngx-sonner';
import { IUser } from '../interfaces/iuser.interface';
import { IUserApiResponseError } from '../interfaces/iuserapiresponse.interfaces';
import { UsersServise } from './users.servise';


@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private usersServices = inject(UsersServise);

  modalOpen = signal(false);
  modalTitle = signal('Modal');
  modalMessage = signal('');
  modalConfirmText = signal('Aceptar');
  modalCancelText = signal('Cancelar');
  private onConfirmAction: null | (() => void | Promise<void>) = null;


  openModal(options: {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void | Promise<void>;
  }): void {
    this.modalTitle.set(options.title);
    this.modalMessage.set(options.message);
    this.modalConfirmText.set(options.confirmText ?? 'Aceptar');
    this.modalCancelText.set(options.cancelText ?? 'Cancelar');
    this.onConfirmAction = options.onConfirm ?? null;
    this.modalOpen.set(true);
  }

  closeModal(): void {
    this.modalOpen.set(false);
    this.onConfirmAction = null;
  }

  confirmDelete(name: string): Promise<{ isConfirmed: boolean }> {
    const isConfirmed = window.confirm(`¿Esta seguro de eliminar a ${name}?`);
    return Promise.resolve({ isConfirmed });
  }

  async success(message: string, action?: () => void | Promise<void>): Promise<void> {
    toast.success(message);
    if (action) {
      await action();
    }
  }

  async error(message: string, action?: () => void | Promise<void>): Promise<void> {
    toast.error(message);
    if (action) {
      await action();
    }
  }

  async confirmModal(): Promise<void> {
    const action = this.onConfirmAction;
    this.closeModal();
    if (action) {
      await action();
    }
  }

  openUserDeleteModal(
    user : IUser,
    onDeleted?: () => void | Promise<void>
  ): void {
    if(!user._id){
      this.error('No se pudo eliminar el usuario')
      return;
    }
    this.openModal({
      title: 'Eliminar usuario',
      message: `¿Esta seguro que quieres eliminar a ${user.first_name} ${user.last_name}?`,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      onConfirm: async () => {
        try {
          await this.usersServices.removeUser(user._id);
          await this.success('Usuario eliminado correctamente');
          if (onDeleted) {
            await onDeleted();
          }
        } catch (error: unknown) {
          const apiError = error as IUserApiResponseError;
          console.error('Error eliminando usuario:', apiError.error || error);
          await this.error('No se pudo eliminar el usuario');
        }
      },
    });
  }

}
