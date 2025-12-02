import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      alert("Veuillez remplir correctement le formulaire ❌");
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        alert('Connexion réussie 🌸');

        if (res.role === 'ADMIN') {
          this.router.navigate(['/admin/ajouter-produit']);
        } else if (res.role === 'LIVREUR') {
          this.router.navigate(['/livreur/valider-livraison']);
        } else {
          this.router.navigate(['/']);
        }
      },

      error: (err) => {
        alert(err.error.message || 'Identifiants incorrects ❌');
      }
    });
  }
}
