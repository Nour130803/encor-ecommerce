import { Component, OnInit } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  slides: any[] = [];
  currentIndex = 0;

  role: string | null = null;
  idUtilisateur: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {

    this.role = sessionStorage.getItem('role');
    this.idUtilisateur = sessionStorage.getItem('idUtilisateur');

    this.http.get<any[]>('http://localhost:8081/api/produits/last3')
      .subscribe({
        next: (data) => {
          this.slides = data.map(p => ({
            image: p.imageUrl
              ? 'http://localhost:8081/api/produits/images/' 
                + p.imageUrl.replace('uploads/', '')   // 🔥 corrige le chemin
              : 'assets/images/home.PNG'               // fallback
          }));
        },
        error: () => {
          this.slides = [
            { image: 'assets/images/home.PNG' },
            { image: 'assets/images/produit2.jpg' },
            { image: 'assets/images/produit3.jpg' }
          ];
        }
      });

  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  previousSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }
}
