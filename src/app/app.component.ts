import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  selector: 'qr-code-gen-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  initialQRData: string = 'https://github.com/MessiInter/qr-code-gen';
  QRDataForm: FormControl = new FormControl();
  QRData: string = '' || this.initialQRData;

  ngOnInit(): void {
    this.QRDataForm.valueChanges.subscribe((value: string) => {
      this.QRData = value || this.initialQRData;
    });
  }
}
