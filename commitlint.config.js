/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at https://github.com/MessiInter/qr-code-gen/blob/master/LICENSE.md
 */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'always', 'sentence-case'],
    'subject-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      ['Add', 'Add/update', 'Remove', 'Update', 'Docs'],
    ],
    'scope-case': [2, 'always', 'kebab-case'],
    'scope-empty': [2, 'always'],
    'references-empty': [2, 'never'],
    'body-leading-blank': [2, 'always'],
    'body-max-length': [2, 'always', 100],
    'footer-leading-blank': [2, 'always'],
    'footer-max-length': [2, 'always', 100],
  },
};
