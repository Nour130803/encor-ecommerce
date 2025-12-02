import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Produit } from '../../../model/produit.model';
import { ProduitService } from '../../../service/produit.service';
import { PanierService } from '../../../service/panier.service';
import { FavorisService } from '../../../service/favoris.service';

@Component({
  selector: 'app-nouveautes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nouveautes.component.html',
  styleUrls: ['./nouveautes.component.scss']
})
export class NouveautesComponent implements OnInit {

  produits: Produit[] = [];

  constructor(
    private produitService: ProduitService,
    private panierService: PanierService,
    private favorisService: FavorisService,
    private router: Router
  ) {}

  ngOnInit() {
    this.produitService.getNouveautes().subscribe({
      next: data => this.produits = data,
      error: err => console.error("Erreur nouveautés", err)
    });
  }

  ajouterAuPanier(idProduit: number) {
    const idUtilisateur = Number(sessionStorage.getItem("idUtilisateur"));
    if (!idUtilisateur) {
      alert("Vous devez être connecté !");
      return;
    }

    this.panierService.ajouterAuPanier(idUtilisateur, idProduit).subscribe({
      next: () => alert("Produit ajouté 🎀"),
      error: err => alert(err.error || "Erreur ❌")
    });
  }

  ajouterFavoris(produit: Produit) {
    const idUtilisateur = Number(sessionStorage.getItem("idUtilisateur"));
    const role = sessionStorage.getItem("role");

    if (!idUtilisateur) {
      if (confirm("💖 Connectez-vous pour ajouter aux favoris ?")) {
        this.router.navigate(['/connexion']);
      }
      return;
    }

    if (role !== "CLIENT") {
      alert("Fonction réservée aux clients 💖");
      return;
    }

    this.favorisService.ajouterFavori(idUtilisateur, produit.id).subscribe({
      next: () => alert(`${produit.nom} ajouté 💖`),
      error: err => alert(err.error || "Erreur ajout favoris")
    });
  }
}
