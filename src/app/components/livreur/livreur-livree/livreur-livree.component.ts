import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivreurNavbarComponent } from '../livreur-navbar/livreur-navbar.component';

import { LivraisonService } from '../../../service/livraison.service';
import { CommandeLivraison } from '../../../model/commande-livraison.model';

@Component({
  selector: 'app-livreur-livree',
  standalone: true,
  imports: [CommonModule, LivreurNavbarComponent],
  templateUrl: './livreur-livree.component.html',
  styleUrls: ['./livreur-livree.component.scss']
})
export class LivreurLivreeComponent implements OnInit {

  idLivreur!: number;
  commandesEnCours: CommandeLivraison[] = [];

  constructor(private livraisonService: LivraisonService) {}

  ngOnInit() {
    this.idLivreur = Number(sessionStorage.getItem("idUtilisateur"));
    this.chargerCommandes();
  }

  chargerCommandes() {
    this.livraisonService.getCommandesEnCours(this.idLivreur)
      .subscribe({
        next: (data) => this.commandesEnCours = data,
        error: () => alert("❌ Erreur de chargement des commandes")
      });
  }

  livrer(idCommande: number) {
    this.livraisonService.confirmerLivraison(idCommande, this.idLivreur)
      .subscribe({
        next: () => {
          alert("✔ Livraison confirmée !");
          this.chargerCommandes();
        },
        error: () => alert("❌ Erreur lors de la livraison")
      });
  }
}
