/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at https://github.com/MessiInter/qr-code-gen/blob/master/LICENSE.md
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
    'body-max-length': [2, 'always', 100],
    'footer-leading-blank': [2, 'always'],
    'footer-max-length': [2, 'always', 100],
  },
};
