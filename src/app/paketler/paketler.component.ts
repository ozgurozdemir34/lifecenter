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
  selector: 'app-paketler',
  standalone: true,
  imports: [MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule],
  templateUrl: './paketler.component.html',
  styleUrl: './paketler.component.css'
})

export class PaketlerComponent {
constructor(private http:HttpClient,private kullanici:kullanici,public dialogRef: MatDialogRef<PaketlerComponent>,@Inject(MAT_DIALOG_DATA) public data: any){}
paketKayit = {
  paketadi: '',
  fiyat:0,
  dondurmahakki:0,
  kullaniciadi:this.kullanici.getCurrentUser()
};
kaydetPaket() {
  this.http.post('http://localhost:3000/paketekle', this.paketKayit).subscribe({
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


