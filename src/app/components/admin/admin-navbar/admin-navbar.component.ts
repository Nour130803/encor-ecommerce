import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent {

  showSearch = false;
  motCle = "";

  constructor(private router: Router) {}

  // 🔍 Afficher / cacher la barre de recherche
  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  // 🔍 Lancer recherche
  rechercher() {
    if (!this.motCle.trim()) return;

    this.router.navigate(['/admin/recherche'], {
      queryParams: { q: this.motCle }
    });

    this.showSearch = false;
  }

  // 👤 Profil admin
  ouvrirProfil() {
    this.router.navigate(['/admin/profil']);
  }
}
