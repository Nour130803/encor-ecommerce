import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Utilisateur } from '../../../model/utilisateur.model';
import { UtilisateurService } from '../../../service/utilisateur.service';
import { LivreurNavbarComponent } from '../livreur-navbar/livreur-navbar.component';

@Component({
  selector: 'app-profil-livreur',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LivreurNavbarComponent],
  templateUrl: './profil-livreur.component.html',
  styleUrls: ['./profil-livreur.component.scss']
})
export class ProfilLivreurComponent implements OnInit {

  utilisateur: Utilisateur | null = null;
  profilForm!: FormGroup;
  editMode = false;

  selectedFile: File | null = null;
  preview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UtilisateurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idUtilisateur = sessionStorage.getItem('idUtilisateur');

    if (!idUtilisateur) {
      this.router.navigate(['/connexion']);
      return;
    }

    this.initForm();
    this.chargerProfil(idUtilisateur);
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
        this.utilisateur = data;
        this.profilForm.patchValue(data);
      },
      error: () => alert("Erreur lors du chargement du profil ❌")
    });
  }

  activerEdition() {
    this.editMode = true;
  }

  annuler() {
    this.editMode = false;
    this.selectedFile = null;
    this.preview = null;

    if (this.utilisateur) {
      this.profilForm.patchValue(this.utilisateur);
    }
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
    if (!this.utilisateur) return;

    const id = this.utilisateur.id_utilisateur;

    this.userService.updateProfilAvecImage(
      id,
      this.profilForm.value,
      this.selectedFile || undefined
    ).subscribe({
      next: (updated) => {
        this.utilisateur = updated;
        this.preview = null;
        this.selectedFile = null;
        this.editMode = false;
        alert("Profil livreur mis à jour ✔");
      },
      error: () => alert("Erreur lors de la mise à jour ❌")
    });
  }

  getImageUrl(): string {
    if (!this.utilisateur?.imageProfil) {
      return 'assets/img/default-user.png';
    }

    const filename = this.utilisateur.imageProfil.replace("uploads/profils/", "");
    return 'http://localhost:8081/api/utilisateurs/images/' + filename;
  }

  deconnexion() {
    sessionStorage.clear();
    this.router.navigate(['/connexion']);
  }
}
