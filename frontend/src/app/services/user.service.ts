import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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

/*       createUser(data: any): Observable<any>{
        return this.http.post(baseUrl, data);

      } */


  addUser(user: User) {
    return this.http.post<User>(baseUrl, user);
  }
}