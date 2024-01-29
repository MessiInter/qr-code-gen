/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at https://github.com/MessiInter/qr-code-gen/blob/master/LICENSE.md
 */

import {join, relative, resolve} from 'node:path';

import {globSync} from 'glob';

const __root: string = join(__dirname, '..');
const pattern: string = '**/jest.config.*.{ts,js,cjs,mjs,tsx,jsx}';
const rootDir: string = '<rootDir>';

export function getJestProjects(): string[] {
  const files: string[] = globSync(pattern);
  const absoluteRootDir: string = resolve(__root);

  return files.map((file: string) => {
    const absolutePath: string = resolve(__root, file);
    return absolutePath.startsWith(absoluteRootDir)
      ? join(rootDir, relative(absoluteRootDir, absolutePath))
      : file;
  });
}
