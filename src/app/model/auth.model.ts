export interface LoginRequest {
  email: string;
  motDePasse: string;
}

export interface LoginResponse {
  idUtilisateur: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  token: string;
}
