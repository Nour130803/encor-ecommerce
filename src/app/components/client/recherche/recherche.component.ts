import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { ProduitService } from '../../../service/produit.service';
import { PanierService } from '../../../service/panier.service';
import { FavorisService } from '../../../service/favoris.service';

import { Produit } from '../../../model/produit.model';

@Component({
  selector: 'app-recherche',
  standalone: true,
  imports: [CommonModule, RouterModule ,HttpClientModule],
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent implements OnInit {

  produits: Produit[] = [];
  motCle: string = "";

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private panierService: PanierService,     // ✔️ injection corrigée
    private favorisService: FavorisService,   // ✔️ injection corrigée
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.motCle = params['q'];
      this.lancerRecherche();
    });
  }

  lancerRecherche() {
    if (!this.motCle) return;

    this.produitService.rechercher(this.motCle)
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
