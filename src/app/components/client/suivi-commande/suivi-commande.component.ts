import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CommandeService } from '../../../service/commande.service';
import { Commande } from '../../../model/commmande.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suivi-commande',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './suivi-commande.component.html',
  styleUrls: ['./suivi-commande.component.scss']
})
export class SuiviCommandeComponent implements OnInit {

  commande: Commande | null = null;
  dateEstimee: string = "";

  constructor(
    private route: ActivatedRoute,
    private commandeService: CommandeService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.commandeService.getById(id).subscribe({
      next: (data) => {
        this.commande = data;
        this.dateEstimee = this.commandeService.genererDateEstimee();
      },
      error: () => alert("Erreur lors du chargement du suivi ❌")
    });
  }

  // 🔥 Méthode MVC simplifiée
  isActive(etats: string[]): boolean {
    return this.commande ? etats.includes(this.commande.etat) : false;
  }
}
