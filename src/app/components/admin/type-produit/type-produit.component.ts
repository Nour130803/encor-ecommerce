import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { TypeProduitService } from '../../../service/type-produit.service';
import { TypeProduit } from '../../../model/type-produit.model';
@Component({
  selector: 'app-type-produit',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNavbarComponent],
  templateUrl: './type-produit.component.html',
  styleUrls: ['./type-produit.component.scss']
})
export class TypeProduitComponent implements OnInit {

  nomType: string = "";
  types: TypeProduit[] = [];

  constructor(private typeService: TypeProduitService) {}

  ngOnInit(): void {
    this.loadTypes();
  }

  // 📌 Charger liste
  loadTypes() {
    this.typeService.getAll().subscribe({
      next: (data) => this.types = data,
      error: () => alert("Erreur chargement types ❌")
    });
  }

  // 📌 Ajouter
  ajouter() {
    if (!this.nomType.trim()) {
      alert("⚠️ Saisir un nom !");
      return;
    }

    this.typeService.ajouter(this.nomType).subscribe({
      next: () => {
        alert("✔ Type ajouté !");
        this.nomType = "";
        this.loadTypes();
      },
      error: () => alert("Erreur ajout ❌")
    });
  }

  // 📌 Supprimer
  supprimer(id: number) {
    if (!confirm("🗑 Supprimer ce type ?")) return;

    this.typeService.supprimer(id).subscribe({
      next: () => {
        alert("✔ Type supprimé !");
        this.loadTypes();
      },
      error: () => alert("Erreur suppression ❌")
    });
  }
}
