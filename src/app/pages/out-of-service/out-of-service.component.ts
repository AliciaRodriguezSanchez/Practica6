import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-out-of-service',
  standalone: true,
  templateUrl: './out-of-service.component.html',
  styleUrls: ['./out-of-service.component.css']
})
export class OutOfServiceComponent {
  private router = inject(Router);
  reloadHome(): void {
    this.router.navigate(['/home']);
  }

}