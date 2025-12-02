import { Produit } from './produit.model';

export interface Panier {
     id: number;
  quantite: number;
  produit: Produit;
}
