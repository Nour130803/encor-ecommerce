import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProduitService } from '../../../service/produit.service';
import { TypeProduitService } from '../../../service/type-produit.service';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';

import { TypeProduit } from '../../../model/type-produit.model';

import { HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-ajouter-produit',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, AdminNavbarComponent],
  templateUrl: './ajouter-produit.component.html',
  styleUrls: ['./ajouter-produit.component.scss']
})
export class AjouterProduitComponent implements OnInit {

  nom = '';
  description = '';
  categorie = '';
  prix: number | null = null;
  stock: number | null = null;

  types: TypeProduit[] = [];
  selectedType: string = '';

  image: File | null = null;
  preview: string | ArrayBuffer | null = null;

  constructor(
    private produitService: ProduitService,
    private typeService: TypeProduitService
  ) {}

  ngOnInit() {
    this.typeService.getAll().subscribe({
      next: (data) => this.types = data,
      error: () => alert("Impossible de charger les types ❌")
    });
  }

  // 📌 Prévisualisation image
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.image = file;

    const reader = new FileReader();
    reader.onload = () => this.preview = reader.result;
    reader.readAsDataURL(file);
  }

  // 📌 Envoi formulaire
  onSubmit() {

    if (!this.nom || !this.description || !this.categorie ||
        !this.selectedType || !this.prix || !this.stock || !this.image) {
      alert("⚠️ Remplis tous les champs !");
      return;
    }

    const formData = new FormData();

    formData.append("nom", this.nom);
    formData.append("description", this.description);
    formData.append("categorie", this.categorie);
    formData.append("prix", this.prix.toString());
    formData.append("stock", this.stock.toString());
    formData.append("idType", this.selectedType);
    formData.append("image", this.image);

  this.produitService.ajouterProduit(formData).subscribe({
  next: () => {
    alert("Produit ajouté avec succès 🎉");
    this.resetForm();
  },
  error: (err: any) => {
    console.error(err);
    alert("Erreur lors de l'ajout ❌");
  }
});
  }

  resetForm() {
    this.nom = "";
    this.description = "";
    this.categorie = "";
    this.prix = null;
    this.stock = null;
    this.selectedType = "";
    this.image = null;
    this.preview = null;
  }
}
