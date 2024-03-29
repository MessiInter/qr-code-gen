/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at https://github.com/MessiInter/qr-code-gen/blob/master/LICENSE.md
 */

/**
 * @fileoverview
 * This file exports the main logic of the
 * image service
 */

import {inject, Injectable} from '@angular/core';

import type {QRCElement} from '../../interfaces/qrc-element';
import type {ElementType} from '../../types/element-type';
import {FileService} from '../file/file.service';
import {UrlService} from '../url/url.service';

@Injectable({
  providedIn: 'root',
})
export class ImgService {
  private readonly fileService: FileService = inject(FileService);
  private readonly urlService: UrlService = inject(UrlService);

  saveAsImage(parent: QRCElement, elementType: ElementType): void {
    let parentElement: null | string = null;

    /**
     * Canvas if block is only used for testing purposes or development
     */
    if (elementType === 'canvas') {
      parentElement = parent.qrcElement.nativeElement
        .querySelector('canvas')
        .toDataURL('image/png');
    } else if (elementType === 'img' || elementType === 'url') {
      /**
       * img or url if block used for production
       */
      parentElement = parent.qrcElement.nativeElement.querySelector('img').src;
    } else {
      alert(
        'Error: Please set the element type (format) to img!'
      ); /* Use for debugging */
    }

    if (parentElement) {
      const blobData: Blob = this.urlService.base64ToBlob(parentElement);
      const blob: Blob = new Blob([blobData], {
        type: 'image/png',
      });

      const url: string = URL.createObjectURL(blob);
      const link: HTMLAnchorElement = document.createElement('a');

      link.href = url;
      link.target = '_self';
      link.download = this.fileService.generateFilename();

      link.click();
    }
  }
}
