import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivreurNavbarComponent } from '../livreur-navbar/livreur-navbar.component';
import { LivraisonService } from '../../../service/livraison.service';
import { Livraison } from '../../../model/livraison.model';

@Component({
  selector: 'app-livreur-historique',
  standalone: true,
  imports: [CommonModule, LivreurNavbarComponent],
  templateUrl: './livreur-historique.component.html',
  styleUrls: ['./livreur-historique.component.scss']
})
export class LivreurHistoriqueComponent implements OnInit {

  validees: Livraison[] = [];
  livrees: Livraison[] = [];
  idLivreur!: number;

  constructor(private livraisonService: LivraisonService) {}

  ngOnInit(): void {
    this.idLivreur = Number(sessionStorage.getItem("idUtilisateur"));
    this.loadHistorique();
  }

  loadHistorique() {
    this.livraisonService.getHistoriqueLivreur(this.idLivreur)
      .subscribe({
        next: (res) => {
          this.validees = res.validees;
          this.livrees = res.livrees;
        },
        error: () => alert("❌ Erreur lors du chargement de l'historique")
      });
  }
}
