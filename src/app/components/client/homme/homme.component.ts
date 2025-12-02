import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { Produit } from '../../../model/produit.model';
import { TypeProduit } from '../../../model/type-produit.model';
import { PanierService } from '../../../service/panier.service';
import { FavorisService } from '../../../service/favoris.service';

@Component({
  selector: 'app-homme',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './homme.component.html',
  styleUrls: ['./homme.component.scss']
})
export class HommeComponent implements OnInit {

  produits: Produit[] = [];
  types: TypeProduit[] = [];
  typeSelectionne: number | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private panierService: PanierService,
    private favorisService: FavorisService
  ) {}

  ngOnInit() {
    this.chargerTypes();
    this.chargerProduits();
  }

  chargerTypes() {
    this.http.get<TypeProduit[]>('http://localhost:8081/api/types/liste')
      .subscribe(data => this.types = data);
  }

  chargerProduits() {
    this.http.get<Produit[]>('http://localhost:8081/api/produits/categorie/Homme')
      .subscribe(data => this.produits = data);
  }

  filtrerParType(idType: number) {
    this.typeSelectionne = idType;

    this.http.get<Produit[]>(`http://localhost:8081/api/produits/categorie/Homme/type/${idType}`)
      .subscribe(data => this.produits = data);
  }

  ajouterAuPanier(idProduit: number) {
    const idUtilisateur = Number(sessionStorage.getItem("idUtilisateur"));

    if (!idUtilisateur) {
      alert("Vous devez être connecté.");
      this.router.navigate(['/connexion']);
      return;
    }

    this.panierService.ajouterAuPanier(idUtilisateur, idProduit).subscribe({
      next: () => alert("Produit ajouté 🎀"),
      error: err => {
        alert(err.error || "Erreur panier");
      }
    });
  }

  ajouterFavoris(produit: Produit) {
    const idUtilisateur = Number(sessionStorage.getItem('idUtilisateur'));
    const role = sessionStorage.getItem("role");

    if (!idUtilisateur) {
      if (confirm("Vous devez être connecté 💖 Voulez-vous vous connecter ?")) {
        this.router.navigate(['/connexion']);
      }
      return;
    }

    if (role !== "CLIENT") {
      alert("Fonction réservée aux clients 💖");
      return;
    }

    this.favorisService.ajouterFavori(idUtilisateur, produit.id).subscribe({
      next: () => alert(produit.nom + " ajouté aux favoris 💖"),
      error: err => alert(err.error || "Erreur favoris ❌")
    });
  }
}
