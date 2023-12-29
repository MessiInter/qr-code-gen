import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { SafeUrl } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';

import { QROptions } from './interfaces/qr-options';
import { ImgService } from './services/img/img.service';
import { ElementType } from './types/element-type';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
    RouterModule,
    QRCodeModule,
  ],
  selector: 'qr-code-gen-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  @ViewChild('widthHeightInput') widthHeightInput: ElementRef;

  imgService: ImgService = inject(ImgService);

  QRCodeOptions: QROptions = {
    alt: 'QR Code',
    ariaLabel: 'QR Code',
    initialQRData: 'https://github.com/MessiInter/qr-code-gen',
    initialWidthHeight: 100,
    margin: 1,
  };

  QRDataForm: FormControl = new FormControl();
  widthHeightForm: FormControl = new FormControl();
  QRData: string = this.QRCodeOptions.initialQRData;
  QRCodeURL: SafeUrl = '';
  widthHeight: number = this.QRCodeOptions.initialWidthHeight;
  elementType: ElementType = 'img';
  showAdvancedOptions: boolean = false;

  onURLChange(url: SafeUrl): void {
    this.QRCodeURL = url;
  }

  onCheckboxChange(checked: boolean): void {
    this.showAdvancedOptions = checked;
  }

  ngOnInit(): void {
    [this.QRDataForm, this.widthHeightForm].forEach((form: FormControl) => {
      form.valueChanges.subscribe((val: string) => {
        if (form === this.QRDataForm) {
          this.QRData = val || this.QRCodeOptions.initialQRData;
        } else {
          this.widthHeight =
            Number(val) || this.QRCodeOptions.initialWidthHeight;
        }
      });
    });
  }
}
