export interface CommandeLivraison {
  id_commande: number;
  pris: boolean;

  utilisateur: {
    nom: string;
    prenom: string;
    adresse: string;
  };
}
