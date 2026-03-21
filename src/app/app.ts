import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ModalComponent } from './shared/modal/modal.component';
import { AlertService } from './services/alert.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NgxSonnerToaster, ModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Practica6');
  alertServices = inject(AlertService);
}
