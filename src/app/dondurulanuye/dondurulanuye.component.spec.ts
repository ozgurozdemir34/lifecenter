import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DondurulanuyeComponent } from './dondurulanuye.component';

describe('DondurulanuyeComponent', () => {
  let component: DondurulanuyeComponent;
  let fixture: ComponentFixture<DondurulanuyeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DondurulanuyeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DondurulanuyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
