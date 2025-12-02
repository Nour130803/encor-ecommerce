export interface Utilisateur {
  id_utilisateur: number;
  nom: string;
  prenom: string;
  email: string;
  adresse: string;
  telephone: string;
  imageProfil?: string | null;
  role?: string;
}
