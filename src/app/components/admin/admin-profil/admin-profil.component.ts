import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { UtilisateurService } from '../../../service/utilisateur.service';
import { Utilisateur } from '../../../model/utilisateur.model';

@Component({
  selector: 'app-admin-profil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, AdminNavbarComponent],
  templateUrl: './admin-profil.component.html',
  styleUrls: ['./admin-profil.component.scss']
})
export class AdminProfilComponent implements OnInit {

  admin: Utilisateur | null = null;
  editMode = false;
  profilForm!: FormGroup;

  selectedFile: File | null = null;
  preview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UtilisateurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = sessionStorage.getItem('idUtilisateur');

    if (!id) {
      this.router.navigate(['/connexion']);
      return;
    }

    this.initForm();
    this.chargerProfil(id);
  }

  initForm() {
    this.profilForm = this.fb.group({
      email: [''],
      nom: [''],
      prenom: [''],
      telephone: [''],
      adresse: ['']
    });
  }

  chargerProfil(id: string) {
    this.userService.getById(id).subscribe({
      next: (data) => {
        this.admin = data;
        this.profilForm.patchValue(data);
      }
    });
  }

  activerEdition() {
    this.editMode = true;
  }

  annuler() {
    this.editMode = false;
    this.preview = null;
    this.selectedFile = null;

    if (this.admin) this.profilForm.patchValue(this.admin);
  }

  onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (!file) return;

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => this.preview = reader.result;
    reader.readAsDataURL(file);
  }

  enregistrer() {
    if (!this.admin) return;

    const id = this.admin.id_utilisateur;

    this.userService.updateProfilAvecImage(id, this.profilForm.value, this.selectedFile ?? undefined)
      .subscribe({
        next: (updated) => {
          this.admin = updated;

          alert("Profil mis à jour 🌸");
          this.editMode = false;
          this.preview = null;
          this.selectedFile = null;
        }
      });
  }

  deconnexion() {
    sessionStorage.clear();
    this.router.navigate(['/connexion']);
  }

  getImageUrl(): string {
    if (!this.admin?.imageProfil) {
      return 'assets/img/default-user.png';
    }

    const fileName = this.admin.imageProfil.replace('uploads/profils/', '');
    return 'http://localhost:8081/api/utilisateurs/images/' + fileName;
  }
}
