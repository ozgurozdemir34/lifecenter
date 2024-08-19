import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaketolusturComponent } from './paketolustur.component';

describe('PaketolusturComponent', () => {
  let component: PaketolusturComponent;
  let fixture: ComponentFixture<PaketolusturComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaketolusturComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaketolusturComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
