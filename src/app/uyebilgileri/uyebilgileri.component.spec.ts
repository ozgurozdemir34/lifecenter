import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UyebilgileriComponent } from './uyebilgileri.component';

describe('UyebilgileriComponent', () => {
  let component: UyebilgileriComponent;
  let fixture: ComponentFixture<UyebilgileriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UyebilgileriComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UyebilgileriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
