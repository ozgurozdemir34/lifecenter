import { Component } from '@angular/core';
import { RouterOutlet,RouterModule, Router } from '@angular/router';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import {FormsModule} from '@angular/forms'
import {MatTabsModule} from "@angular/material/tabs"
import {HttpClient,HttpClientModule, HttpParams} from "@angular/common/http"
import { kullanici} from '../kullanici.service';

@Component({
  selector: 'app-giris',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSlideToggleModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatTabsModule,
    HttpClientModule,
    RouterModule,
   
  ],
  templateUrl: './giris.component.html',
  styleUrls: ['./giris.component.css']
})
export class GirisComponent {
  title = 'lifecenter';
  yeni = "deneme";
  yeniyazi = "";
  kullaniciadi = "";
  sifre = "";
  veriler="";
  veriMesaji=""
  kayitkullaniciadi=""
  kayitsifre=""
  email=""
  kayitmesaji=""
  salonadi=""
  girisyapildimi=false
  
  constructor(private http:HttpClient, private kullanici:kullanici, private router:Router){}

  yazi() {
    return this.title === "lifecenter" ? "evet lifecenter yazısı" : "Hayır lifecenter yazısı değil";
  }

  kullanicisifrekontrol() {
    const params = new HttpParams()
      .set("kullaniciadi", this.kullaniciadi)
      .set("sifre", this.sifre);
   
      this.http.get<any[]>(`http://localhost:3000/salonsahipsorgu`, { params,withCredentials:true}).subscribe({
  
      next: (data:any[]) => {
         if (data.length!=0) {
          this.kullanici.login(this.kullaniciadi)
          this.router.navigate(["/anasayfa"])

         }
        else{
          this.yeniyazi="Lütfen tekrar deneyiniz";
        }
      },
      error: (err) => {
        console.error('Hata:', err); // Hata durumunda hata mesajını gösterebilirsiniz
        this.yeniyazi = "Lütfen tekrar deneyiniz"
      },
      complete: () => {
       
      }
    });
  
 
  
    
}
kayitol(){
  if(!this.kayitkullaniciadi||!this.kayitsifre||!this.email||!this.salonadi){
    this.kayitmesaji="Lütfen bütün alanları doldurunuz"
  }
  else{
    const degerler={
      "kullaniciadi":this.kayitkullaniciadi,
       "sifre":this.kayitsifre,
       "email":this.email,
       "salonadi":this.salonadi
    }
    this.http.post<any[]>("http://localhost:3000/salonsahipkayit",degerler).subscribe({
      next:(value:any[])=> {
         this.girisyapildimi=true
          this.kayitmesaji="Kayıt başarıyla oluştu"
      },
      error:(err)=> {
          this.kayitmesaji="Aynı kayıttan zaten var"
      },
    })
  }
  
}
}
