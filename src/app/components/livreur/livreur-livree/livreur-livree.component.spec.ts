import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreurLivreeComponent } from './livreur-livree.component';

describe('LivreurLivreeComponent', () => {
  let component: LivreurLivreeComponent;
  let fixture: ComponentFixture<LivreurLivreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivreurLivreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivreurLivreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
