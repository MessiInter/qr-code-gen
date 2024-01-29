/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at the root of this project.
 */

import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {SafeUrl} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {QRCodeModule} from 'angularx-qrcode';
import {nanoid} from 'nanoid';

import {HeaderComponent} from './components/header/header.component';
import {QROptions} from './interfaces/qr-options';
import {ImgService} from './services/img/img.service';
import type {ElementType} from './types/element-type';

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
    HeaderComponent,
  ],
  selector: 'qr-code-gen-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  readonly imgService: ImgService = inject(ImgService);

  readonly qrCodeOptions: QROptions = {
    alt: 'QR Code',
    ariaLabel: 'QR Code',
    initialQRData: 'https://github.com/MessiInter/qr-code-gen',
    initialWidthHeight: 150,
    margin: 1,
  };

  readonly qrDataForm: FormControl = new FormControl('');
  qrData: string = this.qrCodeOptions.initialQRData;
  qrCodeUrl: SafeUrl = '';

  readonly widthHeightForm: FormControl = new FormControl('');
  widthHeight: number = this.qrCodeOptions.initialWidthHeight;

  elementType: ElementType = 'img';
  filename: string = `QR_Code_SVG_${nanoid(6)}`;
  showAdvancedOptions: boolean = false;

  onUrlChange(url: SafeUrl): void {
    this.qrCodeUrl = url;
  }

  onCheckboxChange(checked: boolean): void {
    this.showAdvancedOptions = checked;
  }

  ngOnInit(): void {
    this.qrDataForm.valueChanges.subscribe((val: string) => {
      this.qrData = val || this.qrCodeOptions.initialQRData;
      if (this.elementType === 'svg')
        this.filename = `QR_Code_SVG_${nanoid(6)}`;
    });

    this.widthHeightForm.valueChanges.subscribe((val: string) => {
      this.widthHeight = Number(val) || this.qrCodeOptions.initialWidthHeight;
    });
  }
}
