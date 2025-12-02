export interface RegisterRequest {
  nom: string;
  prenom: string;
  telephone: string;
  adresse: string;
  email: string;
  motDePasse: string;
}

export interface RegisterResponse {
  message: string;
  email: string;
}
