import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from '../../../service/commande.service';

@Component({
  selector: 'app-paiement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {

  total: number = 0;
  modePaiement: string = "a_la_livraison";
  modeLivraison: string = "poste";
  idUtilisateur!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commandeService: CommandeService
  ) {}

  ngOnInit() {

    const id = sessionStorage.getItem("idUtilisateur");

    if (!id) {
      alert("Vous devez être connecté ❌");
      this.router.navigate(['/connexion']);
      return;
    }

    this.idUtilisateur = Number(id);

    // Récupérer total de l'URL ou sessionStorage
    this.route.queryParams.subscribe(params => {
      this.total = params["total"]
        ? Number(params["total"])
        : Number(sessionStorage.getItem("totalPanier") || 0);
    });
  }

  payer() {

    this.commandeService
      .validerCommande(
        this.idUtilisateur,
        this.modePaiement,
        this.modeLivraison
      )
      .subscribe({
        next: () => {
          alert("🎉 Paiement validé !");
          this.router.navigate(['/commande']);
        },
        error: () => alert("Erreur lors du paiement ❌")
      });
  }
}
