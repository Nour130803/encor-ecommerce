import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from './../model/commmande.model';
@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private API = "http://localhost:8081/api/commande";

  constructor(private http: HttpClient) {}

  // 📌 Charger toutes les commandes
  getAll(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.API}/liste`);
  }

  // 📌 Valider commande
  valider(id: number) {
    return this.http.put(`${this.API}/valider/${id}`, {});
  }

  // 📌 Passer en préparation
  passerEnCours(id: number) {
    return this.http.put(`${this.API}/en-cours/${id}`, {});
  }

  // 📌 Passer en cours de livraison
  passerEnCoursLivraison(id: number) {
    return this.http.put(`${this.API}/en-cours-livraison/${id}`, {});
  }

  // 📌 Marquer livrée
  marquerLivree(id: number) {
    return this.http.put(`${this.API}/livree/${id}`, {});
  }
   rechercher(mot: string): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.API}/recherche?q=${mot}`);
  }

   getCommandesByUtilisateur(idUtilisateur: number): Observable<Commande[]> {
  return this.http.get<Commande[]>(`${this.API}/utilisateur/${idUtilisateur}`);
}


  // Annuler une commande
  annulerCommande(idCommande: number): Observable<any> {
    return this.http.put(`${this.API}/annuler/${idCommande}`, {});
  }

  // Supprimer une commande
  supprimerCommande(idCommande: number): Observable<any> {
    return this.http.delete(`${this.API}/supprimer/${idCommande}`);
  }
  validerCommande(
    idUtilisateur: number,
    modePaiement: string,
    modeLivraison: string
  ): Observable<any> {
    return this.http.post(
      `${this.API}/valider/${idUtilisateur}`,
      null,
      {
        params: { modePaiement, modeLivraison }
      }
    );
  }
    getById(id: number | string): Observable<Commande> {
    return this.http.get<Commande>(`${this.API}/${id}`);
  }

  // 🔹 Calculer date estimée livraison
  genererDateEstimee(): string {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toLocaleDateString("fr-FR");
  }
}
