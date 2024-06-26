/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at https://github.com/MessiInter/qr-code-gen/blob/master/LICENSE.md
 */

/**
 * @fileoverview
 * This file exports the interface(type) for
 * the QR options object
 */

export interface QROptions {
  alt: string;
  ariaLabel: string;
  initialQRData: string;
  initialWidthHeight: number;
  margin: number;
}
