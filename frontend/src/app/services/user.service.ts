import { Injectable } from "@angular/core";
import { monTab } from "../models/donnes-tab.model";

@Injectable({
    providedIn: 'root'
})
export class UserServices{

    donnees: monTab[] = [
        {
          prenom:'Maman',
          nom:'Gueye',
          email:'mgg@gmail.com',
          tel:777777777
        },
        {
          prenom:'Khadija',
          nom:'Diallo',
          email:'diallokhady@gmail.com',
          tel:777777777
        },
        {
          prenom:'Mouhamed',
          nom:'Diop',
          email:'diopmouhamed@gmail.com',
          tel:777777777
        },
      ];

      getAllDonnes(): monTab[]{
        return this.donnees;
      }
}