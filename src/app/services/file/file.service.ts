/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at https://github.com/MessiInter/qr-code-gen/blob/master/LICENSE.md
 */

import {Injectable} from '@angular/core';
import {nanoid} from 'nanoid';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  generateFilename(): string {
    const date: Date = new Date();

    const year: string = date.getFullYear().toString();
    const month: string = (date.getMonth() + 1).toString();
    const day: string = date.getDate().toString().padStart(2, '0');
    const hours: string = date.getHours().toString().padStart(2, '0');
    const mins: string = date.getMinutes().toString().padStart(2, '0');
    const secs: string = date.getSeconds().toString().padStart(2, '0');
    const rand: string = Math.floor(
      Math.random() * (999999 - 100000 + 1) + 100000
    ).toString();
    const id: string = nanoid(6);

    return `QR_Code_${year}${month}${day}_${hours}${mins}${secs}_${rand}_${id}`;
  }
}
