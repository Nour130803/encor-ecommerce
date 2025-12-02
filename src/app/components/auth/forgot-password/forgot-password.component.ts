import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  email: string = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  envoyerCode() {
    if (!this.email.includes('@')) {
      alert("Veuillez entrer une adresse email valide ❌");
      return;
    }

    this.authService.forgotPassword({ email: this.email }).subscribe({
      next: () => {
        alert("Code envoyé à votre email 💌");
        this.router.navigate(['/verifie-code'], { queryParams: { email: this.email } });
      },
      error: (err) => {
        alert(err.error || "Erreur lors de l'envoi du code ❌");
      }
    });
  }
}
