import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilLivreurComponent } from './profil-livreur.component';

describe('ProfilLivreurComponent', () => {
  let component: ProfilLivreurComponent;
  let fixture: ComponentFixture<ProfilLivreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilLivreurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
