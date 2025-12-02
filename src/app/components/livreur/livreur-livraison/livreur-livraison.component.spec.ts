import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreurLivraisonComponent } from './livreur-livraison.component';

describe('LivreurLivraisonComponent', () => {
  let component: LivreurLivraisonComponent;
  let fixture: ComponentFixture<LivreurLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivreurLivraisonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivreurLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
