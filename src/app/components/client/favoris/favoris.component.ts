import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavorisService } from '../../../service/favoris.service';
import { PanierService } from '../../../service/panier.service';
import { Favori } from '../../../model/favori.model';

@Component({
  selector: 'app-favoris',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.scss']
})
export class FavorisComponent implements OnInit {

  favoris: Favori[] = [];

  constructor(
    private favorisService: FavorisService,
    private panierService: PanierService
  ) {}

  ngOnInit() {
    const id = Number(sessionStorage.getItem('idUtilisateur'));
    if (!id) return;
    this.chargerFavoris(id);
  }

  chargerFavoris(idUtilisateur: number) {
    this.favorisService.getFavoris(idUtilisateur).subscribe({
      next: data => this.favoris = data
    });
  }

  supprimerFavori(id: number) {
    if (!confirm("Supprimer ce favori ?")) return;

    this.favorisService.supprimerFavori(id).subscribe(() => {
      this.favoris = this.favoris.filter(f => f.id !== id);
    });
  }

  ajouterAuPanier(idProduit: number) {
    const idUtilisateur = Number(sessionStorage.getItem('idUtilisateur'));

    this.panierService.ajouterAuPanier(idUtilisateur, idProduit).subscribe({
      next: () => alert("Produit ajouté au panier 🎀"),
      error: err => alert(err.error || "Erreur panier ❌")
    });
  }
}
