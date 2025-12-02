import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/client/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'encor-ecommerce';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {

      // ✅ Vérifier si l'événement est bien NavigationEnd
      if (event instanceof NavigationEnd) {

        const url = event.urlAfterRedirects;

        const isProtected =
          url.startsWith('/admin') ||
          url.startsWith('/livreur');

        const user = sessionStorage.getItem('user');

        if (isProtected && !user) {
          alert("Veuillez vous connecter pour accéder à cette page 🌸");
          this.router.navigate(['/connexion']);
        }
      }
    });
  }

  // ⛔️ Tu as demandé de ne pas modifier ceci → je laisse comme c'est
  isAuthPage(): boolean {
    const url = window.location.pathname;
    return url === '/connexion' || url === '/inscription' || url === '/verifier-code' || url === '/motdepasse'
     || url === '/verifie-code' || url === '/reset-password';
  }

  isAdminPage(): boolean {
    const url = window.location.pathname;
    return url.startsWith('/admin');
  }

  isLivreurPage(): boolean {
    const url = window.location.pathname;
    return url.startsWith('/livreur');
  }
}
