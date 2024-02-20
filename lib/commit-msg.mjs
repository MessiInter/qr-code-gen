/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at https://github.com/MessiInter/qr-code-gen/blob/master/LICENSE.md
 */

/**
 * @fileoverview
 * This file export the 'commitMsg' variable and is the commit message that
 * will be used to commit the changes
 */

/**
 * Import required modules
 */
import {exec} from 'node:child_process';
import {devNull} from 'node:os';
import {promisify} from 'node:util';

import __root from './__root.mjs';
import {parseOutput} from './parse-output.mjs';

/**
 * @constant
 * @type {Function}
 * Promisify the 'exec' function
 */
const execPromises = promisify(exec);

/**
 * @constant
 * @type {any}
 * Execute 'git add --all' first
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {stdout: _stdout, stderr: gitStderr} = await execPromises(
  'git add --all',
  {
    cwd: __root,
  }
);

/**
 * Log the error message of 'git add --all' command (if got an error)
 */
if (gitStderr) console.error(gitStderr);

/**
 * @constant
 * @type {any}
 * @see https://npmjs.com/package/git-auto-commit-msg
 * The output of 'git-auto-commit-msg' command
 * and error message
 */
const {stdout, stderr} = await execPromises(
  `git-auto-commit-msg 2>${devNull}`,
  {
    cwd: __root,
  }
);

/**
 * Log the error message of 'git-auto-commit-msg' command (if got an error)
 */
if (stderr) console.error(stderr);

/**
 * @constant
 * @type {RegExp}
 * CRLF and LF regular expression that will be used to parse the output
 */
const regex = /(\r\n|\r|\n)/g;

/**
 * @constant
 * @type {string}
 * @exports commitMsg - Export the 'commitMsg' variable
 * The commit message that will be used to
 * commit the changes
 */
export const commitMsg = parseOutput(
  stdout.charAt(0).replace('Add', 'Create').toUpperCase() + stdout.slice(1),
  regex
);
