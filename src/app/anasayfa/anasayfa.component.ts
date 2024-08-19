import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { UyekayitComponent } from '../uyekayit/uyekayit.component';
import { DatePipe } from '@angular/common';
import { UyebilgileriComponent } from '../uyebilgileri/uyebilgileri.component';
import { kullanici } from '../kullanici.service';
import { PotansiyelkayitComponent } from '../potansiyelkayit/potansiyelkayit.component';
import { PersonelkayitComponent } from '../personelkayit/personelkayit.component';
import { DondurulanuyeComponent } from '../dondurulanuye/dondurulanuye.component';
import { PaketlerComponent } from '../paketler/paketler.component';
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: 'app-anasayfa',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterOutlet,
    MatSlideToggleModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatTabsModule,
    RouterModule,
    MatTableModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './anasayfa.component.html',
  styleUrls: ['./anasayfa.component.css'],
  providers: [DatePipe]
})
export class AnasayfaComponent implements OnInit {
  kullaniciadi: string | null = "";
  liste: any[] = [];
  potansiyelListe: any[] = [];
  personelliste: any[] = [];
  dondurulanListe: any[] = []; // Dondurulmuş üyeler için liste
  paketler:any[]=[]
  address: string = '';
  link: string = '';
  selectedOption: string|null=null;
  listefiltre = new MatTableDataSource(this.liste);
  potansiyellistefiltre = new MatTableDataSource(this.potansiyelListe);
  personellistefiltre = new MatTableDataSource(this.personelliste);
  dondurulanlistefiltre = new MatTableDataSource(this.dondurulanListe);
  paketlerFiltre=new MatTableDataSource(this.paketler)

  uyeDisplayedColumns: string[] = ['ad', 'soyad', 'sonTarih', 'kayitTarih', 'detaylar'];
  potansiyelDisplayedColumns: string[] = ['ad', 'soyad', 'telefon'];
  personelkolon: string[] = ['ad', 'soyad', 'telefon', 'brans'];
  dondurulanDisplayedColumns: string[] = ['ad', 'soyad', 'dondurmaBaslangic', 'dondurmaBitis'];
  paketlerkolon:string[]=['paketadi','fiyat','dondurmahakki']

  constructor(
    private dialog: MatDialog,
    private kullanici: kullanici,
    private http: HttpClient,
    private datePipe: DatePipe,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.kullaniciadi = this.kullanici.getCurrentUser();
    if (this.kullaniciadi != null) {
      const uyeler = new HttpParams().set("kullaniciadi", this.kullaniciadi);
      this.http.get<any[]>("http://localhost:3000/uyeler", { params: uyeler, withCredentials: true }).subscribe({
        next: (value: any[]) => {
          this.liste = value.map((item) => {
            item.sontarih = this.datePipe.transform(item.sontarih, 'dd.MM.yyyy');
            item.kayittarih = this.datePipe.transform(item.kayittarih, 'dd.MM.yyyy');
            return item;
          });
          this.listefiltre.data = this.liste;
        },
        error: (err) => {
          console.error("Üye listesi alınamadı:", err);
        }
      });

      const getirad = new HttpParams().set("kullaniciadi", this.kullaniciadi);
      this.http.get<any[]>("http://localhost:3000/potansiyeluye", { params: getirad, withCredentials: true }).subscribe({
        next: (value: any[]) => {
          this.potansiyelListe = value;
          this.potansiyellistefiltre.data = this.potansiyelListe;
        },
        error: (err) => {
          console.log(err);
        }
      });

      this.http.get<any[]>("http://localhost:3000/personeller", { params: getirad, withCredentials: true }).subscribe({
        next: (value: any[]) => {
          this.personelliste = value;
          this.personellistefiltre.data = this.personelliste;
        },
        error: (err) => {
          console.log(err);
        }
      });

      // Yeni eklenen: Dondurulmuş üyeler verisi
      this.http.get<any[]>("http://localhost:3000/dondurmagetir", { params: getirad, withCredentials: true }).subscribe({
        next: (value: any[]) => {
          this.dondurulanListe = value.map((item) => {
            item.dondurmaBaslangic = this.datePipe.transform(item.dondurmabaslangic, 'dd.MM.yyyy');
            item.dondurmaBitis = this.datePipe.transform(item.dondurmabitis, 'dd.MM.yyyy');
            return item;
          });
          this.dondurulanlistefiltre.data = this.dondurulanListe;
        },
        error: (err) => {
          console.error("Dondurulmuş üye bilgileri alınamadı:", err);
        }
      });

      this.http.get<any[]>("http://localhost:3000/paketler", { params:getirad,withCredentials:true })
        .subscribe({
          next: (data) => {
            this.paketler = data.map(item => ({
              ...item,
              dondurmaBaslangic: this.datePipe.transform(item.dondurmaBaslangic, 'dd.MM.yyyy'),
              dondurmaBitis: this.datePipe.transform(item.dondurmaBitis, 'dd.MM.yyyy')
            }));
            this.paketlerFiltre.data = this.paketler;
          },
          error: (err) => {
            console.error("Paketler alınamadı:", err);
          }
        });
      

    }
  }

  uyekayit() {
    this.dialog.open(UyekayitComponent, { width: "50%", height: "50%" });
  }
  dondurulanUyeEkle() {
    this.dialog.open(DondurulanuyeComponent, { width: "50%", height: "50%" });
  }

  detaylar(id: string) {
    this.dialog.open(UyebilgileriComponent, {
      width: "50%",
      height: "50%",
      data: { id: id }
    });
  }

  cikis() {
    this.kullanici.logout();
    this.router.navigate([""]);
  }

  potansiyelUyekayit() {
    this.dialog.open(PotansiyelkayitComponent, { width: "50%", height: "50%" });
  }

  personelkaydet() {
    this.dialog.open(PersonelkayitComponent, { width: "50%", height: "50%" });
  }

  paketkaydet(){
    this.dialog.open(PaketlerComponent,{width:"50%",height:"50%"})
  }

  applyFilter(event: Event, filterType: string) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      const filterValue = inputElement.value.trim().toLowerCase();
      switch (filterType) {
        case 'uye':
          this.listefiltre.filter = filterValue;
          break;
        case 'potansiyel':
          this.potansiyellistefiltre.filter = filterValue;
          break;
        case 'personel':
          this.personellistefiltre.filter = filterValue;
          break;
        case 'dondurulan':
          this.dondurulanlistefiltre.filter=filterValue;
          break;
        default:
          break;
      }
    }
  }
}
