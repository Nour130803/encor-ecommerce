import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivreurNavbarComponent } from '../livreur-navbar/livreur-navbar.component';

import { LivraisonService } from '../../../service/livraison.service';
import { CommandeLivraison } from '../../../model/commande-livraison.model';

@Component({
  selector: 'app-livreur-livraison',
  standalone: true,
  imports: [CommonModule, LivreurNavbarComponent],
  templateUrl: './livreur-livraison.component.html',
  styleUrls: ['./livreur-livraison.component.scss']
})
export class LivreurLivraisonComponent implements OnInit {

  commandes: CommandeLivraison[] = [];
  idLivreur!: number;

  constructor(private livraisonService: LivraisonService) {}

  ngOnInit(): void {
    this.idLivreur = Number(sessionStorage.getItem("idUtilisateur"));
    const role = sessionStorage.getItem("role");

    if (role !== "LIVREUR") {
      alert("Accès refusé.");
      return;
    }

    this.loadCommandes();
  }

  loadCommandes() {
    this.livraisonService.getCommandesLivreur(this.idLivreur)
      .subscribe({
        next: (data) => this.commandes = data,
        error: () => alert("❌ Erreur lors du chargement")
      });
  }

  valider(commande: CommandeLivraison) {
    this.livraisonService.prendreCommande(commande.id_commande, this.idLivreur)
      .subscribe({
        next: () => {
          commande.pris = true; // Mise à jour instantanée
          alert("🚚 Commande prise !");
        },
        error: (err) => alert("Erreur : " + err.error)
      });
  }
}
