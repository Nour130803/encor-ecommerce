import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router ,RouterModule } from '@angular/router';
import { CommandeService } from '../../../service/commande.service';
import { Commande } from '../../../model/commmande.model';

@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [CommonModule ,RouterModule],
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit {

  commandes: Commande[] = [];

  constructor(
    private commandeService: CommandeService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = sessionStorage.getItem('idUtilisateur');

    if (!id) {
      alert("Vous devez être connecté pour voir vos commandes ❌");
      this.router.navigate(['/connexion']);
      return;
    }

    this.commandeService
      .getCommandesByUtilisateur(Number(id))
      .subscribe({
        next: (data) => this.commandes = data,
        error: () => alert("Erreur lors du chargement ❌")
      });
  }

ouvrirSuivi(cmd: any) {
  const id = cmd.id_commande || cmd.idCommande || cmd.id;

  if (!id) {
    console.error("ID commande introuvable", cmd);
    alert("Erreur : ID commande non trouvé ❌");
    return;
  }

  this.router.navigate(['/suivi-commande', id]);
}

  annulerCommande(id: number) {
    if (!confirm("Voulez-vous vraiment annuler ?")) return;

    this.commandeService.annulerCommande(id).subscribe({
      next: () => {
        alert("Commande annulée ❌");
        this.ngOnInit(); // recharger la liste
      }
    });
  }

  supprimerCommande(id: number) {
    if (!confirm("Supprimer cette commande définitivement ?")) return;

    this.commandeService.supprimerCommande(id).subscribe({
      next: () => {
        alert("Commande supprimée 🗑️");
        this.commandes = this.commandes.filter(c => c.idCommande !== id);
      }
    });
  }
}
