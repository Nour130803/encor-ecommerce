import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-livreur-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './livreur-navbar.component.html',
  styleUrls: ['./livreur-navbar.component.scss']
})
export class LivreurNavbarComponent {

  showSearch = false;
  motCle = "";

  constructor(private router: Router) {}

  // Afficher / cacher champ recherche
  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  // Redirection vers page recherche livreur
  rechercher() {
    if (!this.motCle.trim()) return;

    this.router.navigate(['/livreur/recherche'], {
      queryParams: { q: this.motCle }
    });

    this.showSearch = false;
    this.motCle = "";
  }

  // Profil livreur
  ouvrirProfil() {
    this.router.navigate(['/livreur/profil']);
  }
}
