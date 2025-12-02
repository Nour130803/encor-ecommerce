import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeProduit } from '../model/type-produit.model';
import { Produit } from '../model/produit.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private API = "http://localhost:8081/api/produits";

  constructor(private http: HttpClient) {}

  // ✔ Récupérer tous les types (mais ceci doit être dans TypeProduitService normalement)
  getTypes(): Observable<TypeProduit[]> {
    return this.http.get<TypeProduit[]>("http://localhost:8081/api/types/liste");
  }

  // ✔ Ajouter un produit
  ajouterProduit(formData: FormData): Observable<Produit> {
    return this.http.post<Produit>(`${this.API}/ajouter`, formData);
  }

    getAll(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.API}/liste`);
  }

  modifier(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.API}/modifier/${id}`, formData);
  }

  supprimer(id: number): Observable<any> {
    return this.http.delete(`${this.API}/supprimer/${id}`);
  }
   getProduitsEnfant(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.API}/categorie/Enfant`);
  }

  // Produits Enfant par type
  getProduitsEnfantByType(idType: number): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.API}/categorie/Enfant/type/${idType}`);
  }

  getByCategorie(categorie: string): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.API}/categorie/${categorie}`);
  }

  // Produits par catégorie + type
  getByCategorieAndType(categorie: string, idType: number): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.API}/categorie/${categorie}/type/${idType}`);
  }

  getNouveautes(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.API}/nouveautes`);
  }

    // 🔍 Recherche produit
  rechercher(keyword: string): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.API}/search?keyword=${keyword}`);
  }

}
