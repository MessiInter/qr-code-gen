import { inject, Injectable } from '@angular/core';

import { QRCElement } from '../../interfaces/qrc-element';
import { ElementType } from '../../types/element-type';
import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root',
})
export class ImgService {
  urlService: UrlService = inject(UrlService);

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
        'Please set the element type (format) to img!'
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
      link.download = 'qrcode';

      link.click();
    }
  }
}
