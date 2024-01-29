/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at the root of this project.
 */

import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  base64ToBlob(base64Image: string): Blob {
    const parts: string[] = base64Image.split(';base64,');
    const imageType: string = parts[0].split(':')[1];
    const decodedData: string = window.atob(parts[1]);
    const uInt8Array: Uint8Array = new Uint8Array(decodedData.length);

    for (let i = 0; i < decodedData.length; i++) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }

    return new Blob([uInt8Array], {
      type: imageType,
    });
  }
}
