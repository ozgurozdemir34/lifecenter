import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotansiyelkayitComponent } from './potansiyelkayit.component';

describe('PotansiyelkayitComponent', () => {
  let component: PotansiyelkayitComponent;
  let fixture: ComponentFixture<PotansiyelkayitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotansiyelkayitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PotansiyelkayitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
