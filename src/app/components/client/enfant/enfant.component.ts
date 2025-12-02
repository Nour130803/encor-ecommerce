import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../../service/produit.service';
import { TypeProduitService } from '../../../service/type-produit.service';
import { FavorisService } from '../../../service/favoris.service';
import { PanierService } from '../../../service/panier.service';
import { Produit } from '../../../model/produit.model';
import { TypeProduit } from '../../../model/type-produit.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enfant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enfant.component.html',
  styleUrls: ['./enfant.component.scss']
})
export class EnfantComponent implements OnInit {

  produits: Produit[] = [];
  types: TypeProduit[] = [];
  typeSelectionne: number | null = null;

  constructor(
    private produitService: ProduitService,
    private typeService: TypeProduitService,
    private favorisService: FavorisService,
    private panierService: PanierService,
    private router: Router
  ) {}

  ngOnInit() {
    this.chargerTypes();
    this.chargerProduits();
  }

  // Charger types
  chargerTypes() {
    this.typeService.getAll().subscribe(res => this.types = res);
  }

  // Charger tous les produits enfant
  chargerProduits() {
    this.produitService.getProduitsEnfant().subscribe(res => this.produits = res);
  }

  // Filtrer par type
  filtrerParType(idType: number) {
    this.typeSelectionne = idType;
    this.produitService.getProduitsEnfantByType(idType)
      .subscribe(res => this.produits = res);
  }

  // Panier
  ajouterAuPanier(idProduit: number) {
    const idUtilisateur = Number(sessionStorage.getItem('idUtilisateur'));
    if (!idUtilisateur) {
      this.router.navigate(['/connexion']);
      return;
    }

    this.panierService.ajouterAuPanier(idUtilisateur, idProduit).subscribe({
      next: () => alert("Produit ajouté 🎀"),
      error: err => alert(err.error || "Erreur")
    });
  }

  // Favoris
  ajouterFavoris(p: Produit) {
    const idUtilisateur = Number(sessionStorage.getItem('idUtilisateur'));
    const role = sessionStorage.getItem('role');

    if (!idUtilisateur) {
      this.router.navigate(['/connexion']);
      return;
    }

    if (role !== 'CLIENT') {
      alert("Réservé aux clients 💖");
      return;
    }

    this.favorisService.ajouterFavori(idUtilisateur, p.id).subscribe({
      next: () => alert(`${p.nom} ajouté 💖`),
      error: err => alert(err.error || "Erreur")
    });
  }
}
