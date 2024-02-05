#!/usr/bin/env node
/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at https://github.com/MessiInter/qr-code-gen/blob/master/LICENSE.md
 */

const fs = require('fs');

const commitMsgFile = process.argv[2];
const commitMsg = fs.readFileSync(commitMsgFile, 'utf-8').trim();
const scope = commitMsg.split('(')[1].split(')')[0].trim();

const isRoot = scope === '';
const isFullPath = /^(\/|[A-Za-z]:\\)/.test(scope);

if (!(isRoot || isFullPath)) {
  throw new Error(
    'Invalid commit message scope. Scope must be either an empty string (root of the repository) or a full path.'
  );
}
