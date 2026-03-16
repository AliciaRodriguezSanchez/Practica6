import { Injectable , inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/iuser.interface';
import { lastValueFrom } from 'rxjs';
import { IUserApiResponse } from '../interfaces/iuserapiresponse.interfaces';


@Injectable({
  providedIn:'root'
})
export class UsersServise {
  private baseUrl = 'https://peticiones.online/api/users'; 
  
  httpClient = inject(HttpClient);

  
  async getAllUserPromise(): Promise<IUser[]> {
    const response = await lastValueFrom(
      this.httpClient.get<IUserApiResponse>(this.baseUrl)
    );
    console.log(response.results)
    return response.results; // solo devolvemos el array de result
  }
  async getAllUserByIdPromise(id:number): Promise<IUser> {
    const response = await lastValueFrom(
      this.httpClient.get<IUser>(`${this.baseUrl}/${id}`)
    );
    return response; // solo devolvemos el array de result
  }

}
