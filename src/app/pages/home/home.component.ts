import { Component, inject, signal } from '@angular/core';
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
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  perPage = signal<number>(10);
  totalUsers = signal<number>(0);

  async ngOnInit() {
    await this.loadUsers(this.currentPage());
  }

  async loadUsers(page: number): Promise<void> {
    try {
      const response = await this.usersServices.getAllUserPromise(page, this.perPage());
      this.users.set(response.results);
      this.currentPage.set(response.page);
      this.totalPages.set(response.total_pages);
      this.totalUsers.set(response.total);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    }
  }

  async nextPage(): Promise<void> {
    if (this.currentPage() < this.totalPages()) {
      await this.loadUsers(this.currentPage() + 1);
    }
  }

  async prevPage(): Promise<void> {
    if (this.currentPage() > 1) {
      await this.loadUsers(this.currentPage() - 1);
    }
  }
}
