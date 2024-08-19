import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, formatDate } from "@angular/common";
import { kullanici } from '../kullanici.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-dondurulanuye',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule
  ],
  templateUrl: './dondurulanuye.component.html',
  styleUrls: ['./dondurulanuye.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'tr-TR' },
    {provide: DateAdapter, useClass: NativeDateAdapter},
    { provide: MAT_DATE_LOCALE, useValue: 'tr-TR' },
    {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}
  ],
})

export class DondurulanuyeComponent {
  ad: string = '';
  soyad: string = '';
  baslangicTarihi: Date | null = null;
  bitisTarihi: Date | null = null;
  

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DondurulanuyeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string, ad: string, soyad: string }
  ) {
    if (data) {
      this.ad = data.ad;
      this.soyad = data.soyad;
    }
  }

  kaydet() {
    const baslangicDate = formatDate(this.baslangicTarihi!, 'yyyy-MM-dd', 'en');
    const bitisDate = formatDate(this.bitisTarihi!, 'yyyy-MM-dd', 'en');
    const yeniUye = {
      
      id:this.data.id,
      baslangictarihi: baslangicDate,
      bitistarihi: bitisDate
      
    };
    this.http.post('http://localhost:3000/dondurmaekle',yeniUye).subscribe({
      next:(value)=> {
          this.dialogRef.close(yeniUye)
      },
      error:(err)=> {
          console.error(err)
      },   
   
    })
    
  
  }

  iptal() {
    this.dialogRef.close();
  }
}
