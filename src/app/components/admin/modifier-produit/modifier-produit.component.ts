import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';

import { ProduitService } from '../../../service/produit.service';
import { TypeProduitService } from '../../../service/type-produit.service';

import { Produit } from '../../../model/produit.model';
import { TypeProduit } from '../../../model/type-produit.model';

@Component({
  selector: 'app-modifier-produit',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNavbarComponent],
  templateUrl: './modifier-produit.component.html',
  styleUrls: ['./modifier-produit.component.scss']
})
export class ModifierProduitComponent implements OnInit {

  produits: Produit[] = [];
  types: TypeProduit[] = [];

  produitSelectionne: Produit | null = null;

  nom = '';
  description = '';
  categorie = '';
  prix: number | null = null;
  stock: number | null = null;

  selectedType: number | null = null;
  imageFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  searchText = "";

  constructor(
    private produitService: ProduitService,
    private typeService: TypeProduitService
  ) {}

  ngOnInit() {
    this.produitService.getAll().subscribe(p => this.produits = p);
    this.typeService.getAll().subscribe(t => this.types = t);
  }

  selectionnerProduit(p: Produit) {
    this.produitSelectionne = p;

    this.nom = p.nom;
    this.description = p.description;
    this.categorie = p.categorie;
    this.prix = p.prix;
    this.stock = p.stock;

    this.selectedType = p.typeProduit?.idType || null;

    this.previewUrl = p.imageUrl
      ? `http://localhost:8081/api/produits/images/${p.imageUrl.replace("uploads/", "")}`
      : null;
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
    if (!this.imageFile) return;

    const reader = new FileReader();
    reader.onload = () => this.previewUrl = reader.result;
    reader.readAsDataURL(this.imageFile);
  }

  modifierProduit() {
    if (!this.produitSelectionne) return;

    const formData = new FormData();
    formData.append("nom", this.nom);
    formData.append("description", this.description);
    formData.append("categorie", this.categorie);
    formData.append("prix", String(this.prix));
    formData.append("stock", String(this.stock));
    formData.append("idType", String(this.selectedType));

    if (this.imageFile) formData.append("image", this.imageFile);

   this.produitService.modifier(this.produitSelectionne.id!, formData)

      .subscribe(() => {
        alert("✔ Produit mis à jour !");
        this.ngOnInit(); // recharge liste
        this.produitSelectionne = null;
      });
  }

  supprimerProduit(id: number) {
    if (!confirm("⚠️ Supprimer ce produit ?")) return;

    this.produitService.supprimer(id).subscribe(() => {
      alert("🗑 Produit supprimé !");
      this.ngOnInit();
    });
  }

  filtrerProduits() {
    if (!this.searchText.trim()) return this.produits;

    const txt = this.searchText.toLowerCase();
    return this.produits.filter(p =>
      p.nom?.toLowerCase().includes(txt) ||
      p.description?.toLowerCase().includes(txt) ||
      p.categorie?.toLowerCase().includes(txt)
    );
  }
}
