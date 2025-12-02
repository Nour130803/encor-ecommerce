import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Favori } from '../model/favori.model';

@Injectable({ providedIn: 'root' })
export class FavorisService {

  private API = "http://localhost:8081/api/favoris";

  constructor(private http: HttpClient) {}

  ajouterFavori(idUtilisateur: number, idProduit: number) {
    return this.http.post(`${this.API}/ajouter`, null, {
      params: { idUtilisateur, idProduit }
    });
  }

  getFavoris(idUtilisateur: number): Observable<Favori[]> {
    return this.http.get<Favori[]>(`${this.API}/${idUtilisateur}`);
  }

  supprimerFavori(idFavori: number) {
    return this.http.delete(`${this.API}/${idFavori}`);
  }
}
