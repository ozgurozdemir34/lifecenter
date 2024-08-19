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
  selector: 'app-potansiyelkayit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './potansiyelkayit.component.html',
  styleUrl: './potansiyelkayit.component.css'
})
export class PotansiyelkayitComponent {
  
hatayazisi=""
  constructor(private http: HttpClient,private kullanici:kullanici,public dialogRef: MatDialogRef<PotansiyelkayitComponent>,
  
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  potansiyelUye = {
    ad: '',
    soyad: '',
    telefon: '',
    kullaniciadi:this.kullanici.getCurrentUser()
  };
  kaydetPersonel() {
    this.http.post('http://localhost:3000/potansiyeluyekaydet', this.potansiyelUye).subscribe({
      next:(value)=> {
        console.log('Potansiyel üye kaydedildi:');
        window.location.reload() 
      },
      error:(err)=> {
          this.hatayazisi="Lütfen bütün alanları doldurunuz"
      },
    }
    
      
    );

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
