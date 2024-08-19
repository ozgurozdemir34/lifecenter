import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UyekayitComponent } from './uyekayit.component';

describe('UyekayitComponent', () => {
  let component: UyekayitComponent;
  let fixture: ComponentFixture<UyekayitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UyekayitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UyekayitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
