import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from '../model/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private API = 'http://localhost:8081/api/utilisateurs';

  constructor(private http: HttpClient) {}

  // 🔹 Récupérer un utilisateur par ID
  getById(id: number | string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.API}/${id}`);
  }

  // 🔹 Ancienne mise à jour (sans image)
  updateProfil(id: number | string, data: Partial<Utilisateur>): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.API}/${id}`, data);
  }

  // 🔹 Upload uniquement de l'image
  uploadImage(id: number | string, file: File): Observable<Utilisateur> {
    const fd = new FormData();
    fd.append("image", file);     // ⚠ doit matcher @FormDataParam("image")

    return this.http.put<Utilisateur>(`${this.API}/upload/${id}`, fd);
  }

 updateProfilAvecImage(id: number | string, data: any, file?: File): Observable<Utilisateur> {

  const fd = new FormData();

  fd.append("nom", data.nom);
  fd.append("prenom", data.prenom);
  fd.append("adresse", data.adresse);
  fd.append("telephone", data.telephone);
  fd.append("email", data.email);

  if (file) {
    fd.append("file", file); // 🔥 MATCH BACKEND
  }

  return this.http.put<Utilisateur>(`${this.API}/${id}`, fd);
}

}
