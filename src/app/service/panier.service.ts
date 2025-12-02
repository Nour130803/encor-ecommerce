import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Panier } from '../model/panier.model';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class PanierService {

  private API = "http://localhost:8081/api/panier";

  constructor(private http: HttpClient) {}

  ajouterAuPanier(idUtilisateur: number, idProduit: number) {
    return this.http.post(`${this.API}/ajouter`, null, {
      params: { idUtilisateur, idProduit }
    });
  }

  getPanier(idUtilisateur: string): Observable<Panier[]> {
    return this.http.get<Panier[]>(`${this.API}/${idUtilisateur}`);
  }

  updatePanier(idUtilisateur: string, panier: Panier[]): Observable<any> {
    return this.http.put(`${this.API}/update/${idUtilisateur}`, panier);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }

  calculerTotal(panier: Panier[]): number {
    return panier.reduce(
      (total, item) => total + (item.produit.prix * item.quantite),
      0
    );
  }
}
