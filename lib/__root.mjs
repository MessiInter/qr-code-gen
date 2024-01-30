/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at https://github.com/MessiInter/qr-code-gen/blob/master/LICENSE.md
 */

/**
 * @fileoverview
 * This file export the '__root' variable and is the root directory of the project
 */

/**
 * Import required modules
 */
import {join} from 'node:path';

import __dirname from './__dirname.mjs';

/**
 * @constant
 * @type {string}
 * Root directory of the project
 */
const __root = join(__dirname, '..');

/**
 * @exports __root - Export default the '__root' variable
 * The root directory of the project
 */
export default __root;
