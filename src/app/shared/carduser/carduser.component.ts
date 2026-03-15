import { Component , input} from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-carduser',
  imports: [],
  templateUrl: './carduser.component.html',
  styleUrl: './carduser.component.css',
})
export class CarduserComponent {
  user=input<IUser>();

}
