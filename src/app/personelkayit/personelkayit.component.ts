import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from "@angular/common";
import { kullanici } from '../kullanici.service';

@Component({
  selector: 'app-personelkayit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './personelkayit.component.html',
  styleUrl: './personelkayit.component.css'
})
export class PersonelkayitComponent {
  constructor(private http: HttpClient,private kullanici:kullanici,public dialogRef: MatDialogRef<PersonelkayitComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {}
  personelKayit = {
    ad: '',
    soyad: '',
    telefon: '',
    brans:'',
    kullaniciadi:this.kullanici.getCurrentUser()
  };
  kaydetPotansiyelUye() {
    this.http.post('http://localhost:3000/personelkaydet', this.personelKayit).subscribe({
      next:(value)=> {
        console.log('Potansiyel üye kaydedildi:');
        window.location.reload() 
      },
      error:(err)=> {
          console.error(err)
      },
    }
    
      
    );

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
