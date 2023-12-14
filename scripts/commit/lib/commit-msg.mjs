// @ts-check

/**
 * @license
 * Copyright MessiInter All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at the root of this project
 */

/**
 * @fileoverview
 * This file export the 'commitMsg' variable and is the commit message that
 * will be used to commit the changes
 */

/**
 * Import required modules
 */
import { exec } from 'child_process';
import { promisify } from 'util';
import { parseOutput } from './parse-output.mjs';

/**
 * @constant
 * @type {Function}
 * Promisify the 'exec' function
 */
const execPromises = promisify(exec);

/**
 * @constant
 * @type {any}
 * @see https://npmjs.com/package/git-auto-commit-msg
 * The output of 'git-auto-commit-msg' command
 * and error message
 */
const { stdout, stderr } = await execPromises('git-auto-commit-msg');

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
export const commitMsg = parseOutput(stdout, regex);
