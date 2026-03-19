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

  
  async getAllUserPromise(page = 1, perPage = 10): Promise<IUserApiResponse> {
    const response = await lastValueFrom(
      this.httpClient.get<IUserApiResponse>(
        `${this.baseUrl}?page=${page}&per_page=${perPage}`
      )
    );
    return response;
  }
  async getAllUserByIdPromise(id:string): Promise<IUser> {
    const response = await lastValueFrom(
      this.httpClient.get<IUser>(`${this.baseUrl}/${id}`)
    );
    return response; // solo devolvemos el array de result
  }

  async removeUser(id: string): Promise<IUser> {
    const response = await lastValueFrom(
      this.httpClient.delete<IUser>(`${this.baseUrl}/${id}`)
    );
    console.log(response)
    return response;
  }

}
