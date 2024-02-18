/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at https://github.com/MessiInter/qr-code-gen/blob/master/LICENSE.md
 */

/**
 * @fileoverview
 * This file exports configuration for commitlint
 */

import type {UserConfig} from '@commitlint/types';

export default <UserConfig>{
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['Add', 'Add/update', 'Remove', 'Update', 'Docs'],
    ],
    'type-case': [0],
    'type-empty': [0],
    'subject-empty': [0],
    'scope-case': [2, 'always', 'kebab-case'],
    'scope-empty': [2, 'always'],
    'body-leading-blank': [2, 'always'],
    'header-max-length': [0],
    'body-max-length': [0],
    'footer-leading-blank': [2, 'always'],
    'footer-max-length': [0],
  },
};
