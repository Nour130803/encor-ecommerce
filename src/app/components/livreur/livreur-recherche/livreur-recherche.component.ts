import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { CommandeService } from '../../../service/commande.service';
import { Commande } from '../../../model/commmande.model';
import { LivreurNavbarComponent } from '../../../components/livreur/livreur-navbar/livreur-navbar.component';

@Component({
  selector: 'app-livreur-recherche',
  standalone: true,
  imports: [CommonModule, RouterModule, LivreurNavbarComponent],
  templateUrl: './livreur-recherche.component.html',
  styleUrls: ['./livreur-recherche.component.scss']
})
export class LivreurRechercheComponent implements OnInit {

  mot = "";
  resultats: Commande[] = [];
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private commandeService: CommandeService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.mot = params['q'] ?? "";

      if (this.mot.trim().length > 0) {
        this.rechercherCommande();
      }
    });
  }

  rechercherCommande() {
    this.isLoading = true;

    this.commandeService.rechercher(this.mot)
      .subscribe({
        next: (data) => {
          this.resultats = data;
          this.isLoading = false;
        },
        error: () => {
          alert("❌ Erreur lors de la recherche");
          this.isLoading = false;
        }
      });
  }
}
