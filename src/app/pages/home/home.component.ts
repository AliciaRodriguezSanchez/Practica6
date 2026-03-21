import { Component, inject, signal } from '@angular/core';
import { CarduserComponent } from '../../components/carduser/carduser.component';
import { UsersServise } from '../../services/users.servise';
import { IUser } from '../../interfaces/iuser.interface';
import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-home',
  imports: [CarduserComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  usersServices = inject(UsersServise);
  alertServices = inject(AlertService);
  users = signal<IUser[]>([]);
  loading = signal<boolean>(false);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  perPage = signal<number>(10);
  totalUsers = signal<number>(0);

  ngOnInit() {
    this.loadUsers(this.currentPage());
  }

  async loadUsers(page: number): Promise<void> {
    this.loading.set(true);
    try {
      const response = await this.usersServices.getAllUserPromise(page, this.perPage());
      this.users.set(response.results);
      this.currentPage.set(response.page);
      this.totalPages.set(response.total_pages);
      this.totalUsers.set(response.total);
    } catch (data : any) {
      this.alertServices.error('Error cargando usuarios:', data.error);
    } finally {
      this.loading.set(false);
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.loadUsers(this.currentPage() + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.loadUsers(this.currentPage() - 1);
    }
  }

  deleteUser(user: IUser): void {
    this.alertServices.openUserDeleteModal(user, () => {
      this.loadUsers(this.currentPage());
    });
  }
}
