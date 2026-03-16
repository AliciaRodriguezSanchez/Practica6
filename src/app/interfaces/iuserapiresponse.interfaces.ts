import { IUser } from "./iuser.interface"

export interface IUserApiResponse {
 page: number;
 per_page: number;
 total: number;
 total_pages: number;
 results : IUser[];
}