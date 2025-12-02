import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifierCodeComponent } from './verifier-code.component';

describe('VerifierCodeComponent', () => {
  let component: VerifierCodeComponent;
  let fixture: ComponentFixture<VerifierCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifierCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifierCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
