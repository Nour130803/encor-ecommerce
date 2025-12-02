import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// 🧩 MODELS
import { Produit } from '../../../model/produit.model';
import { TypeProduit } from '../../../model/type-produit.model';

// 🧩 SERVICES
import { ProduitService } from '../../../service/produit.service';
import { TypeProduitService } from '../../../service/type-produit.service';
import { PanierService } from '../../../service/panier.service';
import { FavorisService } from '../../../service/favoris.service';

@Component({
  selector: 'app-femme',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './femme.component.html',
  styleUrls: ['./femme.component.scss']
})
export class FemmeComponent implements OnInit {

  produits: Produit[] = [];         // ✅ plus de "never"
  types: TypeProduit[] = [];        // ✅ typé
  typeSelectionne: number | null = null;

  constructor(
    private produitService: ProduitService,
    private typeService: TypeProduitService,
    private panierService: PanierService,
    private favorisService: FavorisService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerTypes();
    this.chargerProduits();
  }

  // 🔹 Charger tous les types (bracelet, bague…)
  chargerTypes(): void {
    this.typeService.getAll().subscribe({
      next: (data: TypeProduit[]) => this.types = data,
      error: () => alert("Erreur chargement des types ❌")
    });
  }

  // 🔹 Produits catégorie FEMME
  chargerProduits(): void {
    this.produitService.getByCategorie('Femme').subscribe({
      next: (data: Produit[]) => this.produits = data,
      error: () => alert("Erreur chargement des produits ❌")
    });
  }

  // 🔹 Filtrer par type
  filtrerParType(idType: number): void {
    this.typeSelectionne = idType;
    this.produitService.getByCategorieAndType('Femme', idType).subscribe({
      next: (data: Produit[]) => this.produits = data,
      error: () => alert("Erreur filtrage ❌")
    });
  }

  // 🛒 Ajouter au panier (via PanierService)
  ajouterAuPanier(idProduit: number): void {
    const idUtilisateur = sessionStorage.getItem("idUtilisateur");
    const role = sessionStorage.getItem("role");

    if (!idUtilisateur) {
      if (confirm("🛒 Vous devez être connecté.\nAller à la page de connexion ?")) {
        this.router.navigate(['/connexion']);
      }
      return;
    }

    if (role !== 'CLIENT') {
      alert("Cette fonctionnalité est réservée aux clients 🧡");
      return;
    }

    this.panierService
      .ajouterAuPanier(Number(idUtilisateur), idProduit)
      .subscribe({
        next: () => alert("Produit ajouté au panier 🎀"),
        error: (err) => {
          if (err.error === "STOCK_EPUISE") {
            alert("❌ Ce produit est en rupture de stock");
          } else if (err.error === "STOCK_INSUFFISANT") {
            alert("❌ Stock insuffisant");
          } else {
            alert("Erreur panier ❌");
          }
        }
      });
  }

  // 💖 Ajouter aux favoris (via FavorisService)
  ajouterFavoris(p: Produit): void {
    const idUtilisateur = sessionStorage.getItem('idUtilisateur');
    const role = sessionStorage.getItem('role');

    if (!idUtilisateur) {
      if (confirm("💖 Vous devez être connecté pour ajouter un favori.\nSe connecter ?")) {
        this.router.navigate(['/connexion']);
      }
      return;
    }

    if (role !== 'CLIENT') {
      alert("Cette fonctionnalité est réservée aux clients 💖");
      return;
    }

    this.favorisService
      .ajouterFavori(Number(idUtilisateur), p.id)
      .subscribe({
        next: () => alert(`${p.nom} ajouté à vos favoris 💖`),
        error: (err) => alert(err.error || "Erreur lors de l'ajout aux favoris ❌")
      });
  }
}
