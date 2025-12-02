export interface Livraison {
  id_commande: number;
  date_commande: string;

  etat: string;
  mode_livraison: string;

  utilisateur: {
    nom: string;
    prenom: string;
    adresse: string;
  };
}
