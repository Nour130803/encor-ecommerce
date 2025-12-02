import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livraison } from '../model/livraison.model';
import { CommandeLivraison } from '../model/commande-livraison.model';

@Injectable({
  providedIn: 'root'
})
export class LivraisonService {

  private api = "http://localhost:8081/api/livraison";

  constructor(private http: HttpClient) {}

  getHistoriqueLivreur(idLivreur: number): Observable<{ validees: Livraison[], livrees: Livraison[] }> {
    return this.http.get<{ validees: Livraison[], livrees: Livraison[] }>(
      `${this.api}/historique/${idLivreur}`
    );
  }

  
  getCommandesLivreur(idLivreur: number): Observable<CommandeLivraison[]> {
    return this.http.get<CommandeLivraison[]>(`${this.api}/tableau/${idLivreur}`);
  }

 
  prendreCommande(idCommande: number, idLivreur: number) {
    return this.http.put(`${this.api}/valider/${idCommande}/${idLivreur}`, {});
  }

  getCommandesEnCours(idLivreur: number) {
    return this.http.get<CommandeLivraison[]>(`${this.api}/encours/${idLivreur}`);
  }

  // 📦 Marquer comme livrée
  confirmerLivraison(idCommande: number, idLivreur: number) {
    return this.http.put(`${this.api}/livrer/${idCommande}/${idLivreur}`, {});
  }
  
}
