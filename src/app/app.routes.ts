import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { GirisComponent } from './giris/giris.component';
import { AnasayfaComponent } from './anasayfa/anasayfa.component';

export const routes: Routes = [
    {path:'',component:GirisComponent},
    {path:'anasayfa',component:AnasayfaComponent}
];
