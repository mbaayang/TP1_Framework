import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, } from "@angular/common/http";
import { Observable } from "rxjs";
import { monTab } from "../models/donnes-tab.model";
import { User } from "../models/user";

const baseUrl = 'http://localhost:3000/api/Users';

@Injectable({
    providedIn: 'root'
})
export class UserServices{

    constructor(private http: HttpClient) {}

      getAllUser(): Observable <monTab[]>{
        return this.http.get<monTab[]>(baseUrl);
      }

      getUser(id: any): Observable<monTab> {
        return this.http.get<monTab>(`${baseUrl}/${id}`);
      } 

      addUser(user: User) {
        return this.http.post<User>(baseUrl, user);
      } 

       deleteUser(id: any): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`);
      }  

      updateUser(id: any, user: User): Observable<any> {
        return this.http.put(`${baseUrl}/${id}`, user);
      }
}