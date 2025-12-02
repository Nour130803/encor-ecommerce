import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent implements OnInit {

  email = "";
  code = "";

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.email = this.route.snapshot.queryParamMap.get("email") || "";
  }

  verifier() {
    if (!this.code.trim()) {
      alert("Veuillez saisir le code ❌");
      return;
    }

    this.authService.verifyResetCode({ email: this.email, code: this.code }).subscribe({
      next: () => {
        alert("Code correct !");
        this.router.navigate(['/reset-password'], { queryParams: { email: this.email } });
      },
      error: () => {
        alert("Code incorrect ❌");
      }
    });
  }
}
