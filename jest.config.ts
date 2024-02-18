/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at https://github.com/MessiInter/qr-code-gen/blob/master/LICENSE.md
 */

/**
 * @fileoverview
 * This file exports configuration for Jest
 */

import {getJestProjects} from './src/get-jest-projects';

export default {
  projects: getJestProjects(),
};
