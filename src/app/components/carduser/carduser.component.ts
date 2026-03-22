import { Component, EventEmitter, Output, input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carduser',
  imports: [RouterLink],
  templateUrl: './carduser.component.html',
  styleUrl: './carduser.component.css',
})
export class CarduserComponent {
  user = input.required<IUser>();
  @Output() deleteRequested = new EventEmitter<IUser>();

  requestDelete(user: IUser): void {
    this.deleteRequested.emit(user);
  }
}


