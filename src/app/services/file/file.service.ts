import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private date: Date = new Date();

  generateFilename(): string {
    const year: string = this.date.getFullYear().toString();
    const month: string = (this.date.getMonth() + 1).toString();
    const day: string = this.date.getDate().toString().padStart(2, '0');
    const hours: string = this.date.getHours().toString().padStart(2, '0');
    const mins: string = this.date.getMinutes().toString().padStart(2, '0');
    const secs: string = this.date.getSeconds().toString().padStart(2, '0');
    const rand: string = Math.floor(
      Math.random() * (999999 - 100000 + 1) + 100000
    ).toString();

    return `QR_Code_${year}${month}${day}_${hours}${mins}${secs}_${rand}`;
  }
}
