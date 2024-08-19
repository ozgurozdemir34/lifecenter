import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaketlerComponent } from './paketler.component';

describe('PaketlerComponent', () => {
  let component: PaketlerComponent;
  let fixture: ComponentFixture<PaketlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaketlerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaketlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
