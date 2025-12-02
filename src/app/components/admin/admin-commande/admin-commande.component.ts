import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { CommandeService } from '../../../service/commande.service';
import { Commande } from '../../../model/commmande.model';

@Component({
  selector: 'app-admin-commande',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, AdminNavbarComponent],
  templateUrl: './admin-commande.component.html',
  styleUrls: ['./admin-commande.component.scss']
})
export class AdminCommandeComponent implements OnInit {

  commandes: Commande[] = [];
  searchText: string = "";

  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.loadCommandes();
  }

  loadCommandes() {
    this.commandeService.getAll().subscribe({
      next: (data) => this.commandes = data
    });
  }

  valider(id: number) {
    this.commandeService.valider(id).subscribe(() => {
      alert("✔ Commande validée !");
      this.loadCommandes();
    });
  }

  passerEnCours(id: number) {
    this.commandeService.passerEnCours(id).subscribe(() => {
      alert("🛠 Mise en préparation !");
      this.loadCommandes();
    });
  }

  passerEnCoursLivraison(id: number) {
    this.commandeService.passerEnCoursLivraison(id).subscribe(() => {
      alert("🚚 En cours de livraison !");
      this.loadCommandes();
    });
  }

  marquerLivree(id: number) {
    this.commandeService.marquerLivree(id).subscribe(() => {
      alert("✔ Commande livrée !");
      this.loadCommandes();
    });
  }

  etatClass(etat: string) {
    switch (etat) {
      case 'EN_ATTENTE': return 'etat-attente';
      case 'VALIDEE': return 'etat-valide';
      case 'EN_PREPARATION': return 'etat-preparation';
      case 'EN_COURS_DE_LIVRAISON': return 'etat-livraison';
      case 'LIVREE': return 'etat-terminee';
      default: return '';
    }
  }

  filtrerCommandes() {
    if (!this.searchText.trim()) return this.commandes;

    const txt = this.searchText.toLowerCase();

    return this.commandes.filter(c =>
      c.idCommande.toString().includes(txt) ||
      c.utilisateur.nom.toLowerCase().includes(txt) ||
      c.utilisateur.prenom.toLowerCase().includes(txt) ||
      c.utilisateur.adresse.toLowerCase().includes(txt) ||
      c.etat.toLowerCase().includes(txt)
    );
  }
}
