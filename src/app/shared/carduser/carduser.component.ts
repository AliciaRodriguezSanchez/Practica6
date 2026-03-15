import { Component , input} from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carduser',
  imports: [RouterLink],
  templateUrl: './carduser.component.html',
  styleUrl: './carduser.component.css',
})
export class CarduserComponent {
  user=input<IUser>();
  openModal (){
    alert("delete")
  }

}
