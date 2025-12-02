import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Livreur } from '../model/livreur.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivreurService {

  private api = "http://localhost:8081/api/utilisateurs";

  constructor(private http: HttpClient) {}

  // 👉 Récupérer un livreur par ID
  getLivreur(id: number): Observable<Livreur> {
    return this.http.get<Livreur>(`${this.api}/${id}`);
  }

  // 👉 Modifier les infos du livreur
  updateLivreur(id: number, data: any): Observable<Livreur> {
    return this.http.put<Livreur>(`${this.api}/${id}`, data);
  }

  // 👉 Mettre à jour l’image du livreur
  uploadPhoto(id: number, file: File) {
    const fd = new FormData();
    fd.append("file", file);

    return this.http.post(`${this.api}/upload/${id}`, fd);
  }
}
