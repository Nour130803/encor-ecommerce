import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreurRechercheComponent } from './livreur-recherche.component';

describe('LivreurRechercheComponent', () => {
  let component: LivreurRechercheComponent;
  let fixture: ComponentFixture<LivreurRechercheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivreurRechercheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivreurRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
