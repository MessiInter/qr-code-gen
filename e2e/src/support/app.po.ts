/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at the root of this project.
 */

import {join} from 'path';

export function getFiles(dir = '.', pattern = '*'): string[] {
  let files: string[] = [];

  cy.exec(`find ${join(dir, pattern)} -maxdepth 1 -type f`).then(
    ({stdout}: {stdout: string}) => {
      files = stdout.split(/\r\n|\n|\r/g);
    }
  );

  return files;
}
