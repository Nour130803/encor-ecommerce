import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreurHistoriqueComponent } from './livreur-historique.component';

describe('LivreurHistoriqueComponent', () => {
  let component: LivreurHistoriqueComponent;
  let fixture: ComponentFixture<LivreurHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivreurHistoriqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivreurHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
