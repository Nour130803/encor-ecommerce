import { Utilisateur } from "./utilisateur.model";
import { Livreur } from "./livreur.model";

export interface Commande {
  idCommande: number;      // CORRIGÉ
  total: number;
  dateCommande: string;    // CORRIGÉ
  etat: string;
  modeLivraison: string;   // CORRIGÉ
  utilisateur: Utilisateur;
  livreur?: Livreur | null;
}
