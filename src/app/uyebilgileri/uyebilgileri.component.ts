import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from "@angular/common";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule,MAT_DATE_LOCALE, NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { DondurulanuyeComponent } from '../dondurulanuye/dondurulanuye.component';

@Component({
  selector: 'app-uyebilgileri-dialog',
  templateUrl: './uyebilgileri.component.html',
  styleUrls: ['./uyebilgileri.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'tr-TR' },
    {provide: DateAdapter, useClass: NativeDateAdapter},
    { provide: MAT_DATE_LOCALE, useValue: 'tr-TR' },
    {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}
  ],
  
  
})
export class UyebilgileriComponent {
  ad: string = "";
  soyad: string = "";
  yil: number | null = null;
  gun: number | null = null;
  ay: number | null = null;
  dogumtarihi: Date | null = null;
  meslek: string | null = null;
  ceptelefonu: string | null = null;
  ozeldurum: string | null = null;
  kangrubu: string | null = null;
  cinsiyet: string | null = null;
  yazi = "";
  bakiye: number | null = null;
  qrCode: string | null = null;
  brans: string | null = null;
  baslangictarihi: Date | null = null;
  bitistarihi: Date | null = null;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<UyebilgileriComponent>,
    public dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {
    if (this.data && this.data.id) {
      this.getUyeBilgileri(this.data.id);
    } else {
      console.error("Üye ID'si bulunamadı");
    }
  }

  getUyeBilgileri(id: string) {
    this.http.get<any>(`http://localhost:3000/uyebilgileri/${id}`).subscribe({
      next: (value) => {
        this.ad = value.ad;
        this.soyad = value.soyad;
        this.dogumtarihi = new Date(value.dogumtarihi);
        this.meslek = value.meslek;
        this.ceptelefonu = value.telefon;
        this.ozeldurum = value.ozeldurum;
        this.kangrubu = value.kangrubu;
        this.cinsiyet = value.cinsiyet;
        this.bakiye = value.bakiye;
        this.qrCode = value.qr;
        this.brans = value.brans;
        this.baslangictarihi = new Date(value.kayittarih);
        this.bitistarihi = new Date(value.sontarih);
      },
      error: (err) => {
        console.error("Üye bilgileri alınamadı:", err);
      }
    });
  }

  guncelle() {
    const guncellenenBilgiler = {
      ad: this.ad,
      soyad: this.soyad,
      yil: this.yil,
      ay: this.ay,
      gun: this.gun,
      dogumtarihi: formatDate(this.dogumtarihi!, 'yyyy-MM-dd', 'en'),
      meslek: this.meslek,
      ceptelefonu: this.ceptelefonu,
      ozeldurum: this.ozeldurum,
      kangrubu: this.kangrubu,
      cinsiyet: this.cinsiyet,
      bakiye: this.bakiye,
      brans: this.brans,
      baslangictarihi: formatDate(this.baslangictarihi!, 'yyyy-MM-dd', 'en'),
      bitistarihi: formatDate(this.bitistarihi!, 'yyyy-MM-dd', 'en')
    };

    this.http.post(`http://localhost:3000/uyeguncelle/${this.data.id}`, guncellenenBilgiler).subscribe({
      next: (value) => {
        console.log("Güncelleme başarılı:", value);
        this.dialogRef.close();
        window.location.reload();
      },
      error: (err) => {
        this.yazi = "Lütfen daha sonra tekrar deneyin";
        console.error(err);
      }
    });
  }

  iptal() {
    this.dialogRef.close();
  }

  dondurma(){
    this.dialog.open(DondurulanuyeComponent,{width:"50%", height:"50%", data: { id: this.data.id, ad: this.ad, soyad: this.soyad }})
   
  }
}
