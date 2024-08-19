import { Component } from '@angular/core';
import { RouterOutlet, } from '@angular/router';

import {MatSlideToggleModule} from "@angular/material/slide-toggle"
import {DragDropModule} from "@angular/cdk/drag-drop"
import{MatButtonModule} from "@angular/material/button"
import {MatIconModule} from '@angular/material/icon'
import {MatInputModule} from "@angular/material/input"
import { GirisComponent } from "./giris/giris.component";
import { AnasayfaComponent } from "./anasayfa/anasayfa.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatSlideToggleModule, DragDropModule,
    MatButtonModule, MatIconModule, MatInputModule, GirisComponent, AnasayfaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  
}
