import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class kullanici {
  private isAuthenticated: boolean = false;
  private currentUser: string | null = null;
  private email: string = "";
  private sifre: string = "";

  constructor() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = savedUser;
      this.isAuthenticated = true;
    }
  }

  login(kullaniciadi: string) {
    this.isAuthenticated = true;
    this.currentUser = kullaniciadi;
    localStorage.setItem('currentUser', kullaniciadi);
  }

  logout() {
    this.isAuthenticated = false;
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUser(): string | null {
    return this.currentUser;
  }

  kaydol(kullaniciadi: string, email: string, sifre: string): string {
    this.currentUser = kullaniciadi;
    this.email = email;
    this.sifre = sifre;
    localStorage.setItem('currentUser', kullaniciadi);
    return this.currentUser;
  }
}
