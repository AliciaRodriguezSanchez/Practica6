import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';



@Component({
  selector: 'app-newuser',
  imports: [FormsModule, RouterModule],
  templateUrl: './newuser.component.html',
  styleUrl: './newuser.component.css',
})
export class NewuserComponent {
 user :  IUser = {
    _id:'',
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    image: ''
  };

  
 saveUser() {
    console.log(this.user);
  }
  deleteUser(){}
}

