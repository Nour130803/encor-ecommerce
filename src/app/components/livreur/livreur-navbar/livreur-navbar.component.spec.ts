import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreurNavbarComponent } from './livreur-navbar.component';

describe('LivreurNavbarComponent', () => {
  let component: LivreurNavbarComponent;
  let fixture: ComponentFixture<LivreurNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivreurNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivreurNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
