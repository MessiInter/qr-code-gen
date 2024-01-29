/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at https://github.com/MessiInter/qr-code-gen/blob/master/LICENSE.md
 */

import {nxE2EPreset} from '@nx/cypress/plugins/cypress-preset';
import {defineConfig} from 'cypress';

export default defineConfig({
  e2e: nxE2EPreset(__filename, {cypressDir: 'src'}),
});
