import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/client/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'encor-ecommerce';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      
      if (event instanceof NavigationEnd) {

        const url = event.urlAfterRedirects;

        const isProtected =
          url.startsWith('/admin') ||
          url.startsWith('/livreur') ;
         

        const user = sessionStorage.getItem('user');

        if (isProtected && !user) {
          alert("Veuillez vous connecter pour accéder à cette page 🌸");
          this.router.navigate(['/connexion']);
        }
      }
    });
  }

  isAuthPage(): boolean {
    const url = window.location.pathname;
    return (
      url === '/connexion' ||
      url === '/inscription' ||
      url === '/verifier-code' ||
      url === '/motdepasse' ||
      url === '/verifie-code' ||
      url === '/reset-password'
    );
  }

  isAdminPage(): boolean {
    return window.location.pathname.startsWith('/admin');
  }

  isLivreurPage(): boolean {
    return window.location.pathname.startsWith('/livreur');
  }
}
