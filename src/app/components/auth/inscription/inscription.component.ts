import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      alert("Veuillez remplir tous les champs ❌");
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        alert("Compte créé avec succès 🌸");

        this.router.navigate(['/verifier-code'], {
          queryParams: { email: this.registerForm.value.email }
        });
      },
      error: (err) => {
        alert(err.error?.message || "Erreur lors de l'inscription ❌");
      }
    });
  }
}
