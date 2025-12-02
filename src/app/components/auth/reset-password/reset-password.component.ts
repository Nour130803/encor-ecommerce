import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  email = "";
  mot1 = "";
  mot2 = "";

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.email = this.route.snapshot.queryParamMap.get("email") || "";
  }

  changer() {
    if (!this.mot1 || !this.mot2) {
      alert("Veuillez remplir les deux champs ❌");
      return;
    }

    if (this.mot1 !== this.mot2) {
      alert("Les mots de passe ne correspondent pas ❌");
      return;
    }

    this.authService.resetPassword({
      email: this.email,
      motDePasse: this.mot1
    }).subscribe({
      next: () => {
        alert("Mot de passe changé avec succès 🌸");
        this.router.navigate(['/connexion']);
      },
      error: () => {
        alert("Erreur serveur ❌");
      }
    });
  }
}
