import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeProduit } from '../model/type-produit.model';

@Injectable({
  providedIn: 'root'
})
export class TypeProduitService {

  private API = 'http://localhost:8081/api/types';

  constructor(private http: HttpClient) {}

  // ✔ Récupérer tous les types
  getAll(): Observable<TypeProduit[]> {
    return this.http.get<TypeProduit[]>(`${this.API}/liste`);
  }

  ajouter(nom: string) {
    return this.http.post(`${this.API}/ajouter?nom=${encodeURIComponent(nom)}`, null);
  }

  // 📌 Supprimer un type
 supprimer(id: number) {
  return this.http.delete(`${this.API}/supprimer/${id}`);
}

}
