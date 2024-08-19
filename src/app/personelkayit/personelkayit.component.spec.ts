import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonelkayitComponent } from './personelkayit.component';

describe('PersonelkayitComponent', () => {
  let component: PersonelkayitComponent;
  let fixture: ComponentFixture<PersonelkayitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonelkayitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonelkayitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
