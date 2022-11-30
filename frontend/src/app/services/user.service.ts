import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { monTab } from "../models/donnes-tab.model";

const baseUrl = 'http://localhost:3000/Users';

@Injectable({
    providedIn: 'root'
})
export class UserServices{

    constructor(private http: HttpClient) {}

      getAllDonnes(): Observable <monTab[]>{
        return this.http.get<monTab[]>(baseUrl);
      }
}