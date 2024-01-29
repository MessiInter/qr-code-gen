/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at https://github.com/MessiInter/qr-code-gen/blob/master/LICENSE.md
 */

/**
 * Import required modules
 */
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

/**
 * @constant
 * @type {string}
 * Current directory path
 */
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * @exports __dirname - Export default the '__dirname' variable
 * The current directory path
 */
export default __dirname;
