import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  showSearch = false;
  motCle = "";

  role: string | null = null;
  idUtilisateur: string | null = null;

  constructor(private router: Router) {
    this.role = sessionStorage.getItem('role');
    this.idUtilisateur = sessionStorage.getItem('idUtilisateur');
  }

  // 📌 Vérifier si c'est un client connecté
  isClient(): boolean {
    return this.role === 'CLIENT' && this.idUtilisateur !== null;
  }

  // ❤️ Favoris
  ouvrirFavoris() {
    if (!this.isClient()) {
      if (confirm("Vous devez être connecté en tant que client pour voir vos favoris. Se connecter ?")) {
        this.router.navigate(['/connexion']);
      }
      return;
    }

    this.router.navigate(['/favoris']);
  }

  // 🛒 Panier
  ouvrirPanier() {
    if (!this.isClient()) {
      if (confirm("🛒 Vous devez être connecté pour consulter votre panier.\nSe connecter ?")) {
        this.router.navigate(['/connexion']);
      }
      return;
    }

    this.router.navigate(['/panier']);
  }

  // 👤 Profil
  ouvrirProfil() {
    if (!this.isClient()) {
      if (confirm("Vous devez être connecté pour consulter votre profil. Se connecter ?")) {
        this.router.navigate(['/connexion']);
      }
      return;
    }

    this.router.navigate(['/profil']);
  }

  // 🔍 Recherche
  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  rechercher() {
    if (this.motCle.trim().length === 0) return;

    this.router.navigate(['/recherche'], {
      queryParams: { q: this.motCle }
    });

    this.showSearch = false;
    this.motCle = "";
  }
}
