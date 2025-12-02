import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanierService } from '../../../service/panier.service';
import { Panier } from '../../../model/panier.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {

  panier: Panier[] = [];

  constructor(
    private panierService: PanierService,
    private router: Router
  ) {}

  ngOnInit() {
    this.chargerPanier();
  }

  chargerPanier() {
    const idUtilisateur = sessionStorage.getItem('idUtilisateur');

    if (!idUtilisateur) {
      alert("Vous devez être connecté ❌");
      this.router.navigate(['/connexion']);
      return;
    }

    this.panierService.getPanier(idUtilisateur).subscribe(data => {
      this.panier = data;
    });
  }

  increment(item: Panier) {
    item.quantite++;
  }

  decrement(item: Panier) {
    if (item.quantite > 1) item.quantite--;
  }

  total() {
    return this.panierService.calculerTotal(this.panier);
  }

  mettreAJour() {
    const idUtilisateur = sessionStorage.getItem('idUtilisateur');
    if (!idUtilisateur) return;

    this.panierService.updatePanier(idUtilisateur, this.panier)
      .subscribe(() => alert("Panier mis à jour 🎀"));
  }

  validerCommande() {
    const idUtilisateur = sessionStorage.getItem("idUtilisateur");
    if (!idUtilisateur) return;

    sessionStorage.setItem("totalPanier", this.total().toString());

    this.router.navigate(['/paiement'], {
      queryParams: {
        total: this.total(),
        user: idUtilisateur
      }
    });
  }

  supprimer(id: number) {
    if (confirm("Supprimer cet article ?")) {
      this.panierService.deleteItem(id).subscribe(() => {
        this.panier = this.panier.filter(item => item.id !== id);
      });
    }
  }
}
