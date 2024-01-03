// @ts-check

/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at the root of this project
 */

/**
 * @fileoverview
 * This file export 'branch' variable
 * 'branch' variable is your current branch name in git
 */

/**
 * Import required modules
 */
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

/**
 * @constant
 * @type {Function}
 * Promisify the 'exec' function
 */
const execPromises = promisify(exec);

/**
 * @constant
 * @type {string[]}
 * 'git rev-parse' command options
 */
const options = ['--abbrev-ref', 'HEAD'];

/**
 * @constant
 * @type {any}
 * Output of 'git rev-parse' command (current branch name)
 * and error message
 */
const { stdout: branch, stderr } = await execPromises(
  `git rev-parse ${options.join(' ')}`
);

/**
 * Log the error message of 'git rev-parse' command (if got an error)
 */
if (stderr) console.error(stderr);

/**
 * @constant
 * @type {string}
 * @exports branch - Export default the 'branch' variable (current branch name)
 * The branch name that will be used to commit changes
 */
export default branch;
