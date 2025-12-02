import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-verifier-code',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verifier-code.component.html',
  styleUrls: ['./verifier-code.component.scss']
})
export class VerifierCodeComponent implements OnInit {

  code: string = '';
  email: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  onVerify() {
    if (this.code.trim() === '') {
      alert("Veuillez entrer le code 🌸");
      return;
    }

    this.authService.verifyCode({ email: this.email, code: this.code })
      .subscribe({
        next: () => {
          alert('Compte vérifié avec succès 💕');
          this.router.navigate(['/connexion']);
        },
        error: () => {
          alert('Code incorrect ❌');
        }
      });
  }

  onResend() {
    this.authService.resendCode({ email: this.email })
      .subscribe({
        next: () => alert("Code renvoyé 💌"),
        error: () => alert("Erreur lors de l'envoi ❌")
      });
  }
}
