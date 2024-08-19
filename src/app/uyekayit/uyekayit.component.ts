import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { kullanici } from '../kullanici.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from "@angular/common";


@Component({
  selector: 'app-uyekayit-dialog',
  templateUrl: './uyekayit.component.html',
  styleUrls: ['./uyekayit.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'tr-TR' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UyekayitComponent implements OnInit {
  ad = "";
  soyad = "";
  yil: number | null = null;
  gun: number | null = null;
  ay: number | null = null;
  yazi = "";
  meslek: string | null = null;
  ceptelefonu: string | null = null;
  ozeldurum: string | null = null;
  kangrubu: string | null = null;
  cinsiyet: string | null = null;
  brans: string | null = null;
  baslangictarihi: Date | null = null;
  bitistarihi: Date | null = null;
  dogumtarihi: Date | null = null;
  selectedPaketId: number | null = null; 
  paketler: any[] = [];

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<UyekayitComponent>,
    private kullanici: kullanici
  ) {}

  ngOnInit(): void {
    this.getPaketler(); // Bileşen yüklendiğinde paketleri getir
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const baslangicDate = formatDate(this.baslangictarihi!, 'yyyy-MM-dd', 'en');
    const bitisDate = formatDate(this.bitistarihi!, 'yyyy-MM-dd', 'en');
    const dogumDate = formatDate(this.dogumtarihi!, 'yyyy-MM-dd', 'en');

    const degerler = {
      "kullaniciadi": this.kullanici.getCurrentUser(),
      "ad": this.ad,
      "soyad": this.soyad,
      "bitistarihi": bitisDate,
      "dogumtarihi": dogumDate,
      "meslek": this.meslek,
      "baslangictarihi": baslangicDate,
      "ceptelefonu": this.ceptelefonu,
      "ozeldurum": this.ozeldurum,
      "kangrubu": this.kangrubu,
      "cinsiyet": this.cinsiyet,
      "brans": this.brans,
      "paketid": this.selectedPaketId 
    };

    this.http.post("http://localhost:3000/uyekayit", degerler).subscribe({
      next: (value) => {
        this.yazi = "Kayıt başarıyla oluşturuldu";
        window.location.reload(); // Kaydedildikten sonra sayfayı yenileyin
      },
      error: (err) => {
        this.yazi = "Hata oluştu: " + err;
      }
    });
  }

  getPaketler(): void {
    const kullaniciadi = this.kullanici.getCurrentUser();
    this.http.get<any[]>(`http://localhost:3000/paketgetir?kullaniciadi=${kullaniciadi}`).subscribe({
      next: (data) => {
        this.paketler = data;
        console.log("Paketler getirildi:", this.paketler);
      },
      error: (err) => {
        console.error("Paketler getirilirken hata oluştu:", err);
      }
    });
  }
}
