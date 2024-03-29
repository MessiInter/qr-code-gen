#!/usr/bin/env node
/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at https://github.com/MessiInter/qr-code-gen/blob/master/LICENSE.md
 */

/**
 * @fileoverview
 * This file will commit all the changes made in current branch
 * with the message exported from '../lib/commit-msg.mjs' file
 * to the current branch (exported from '../lib/branch.mjs' file)
 */

/**
 * Check the OS is Windows or not
 * If it is, throw an error
 *
 * @throws {Error}
 */
/**
 * Import required modules
 */
import {exec} from 'node:child_process';
import {promisify} from 'node:util';

import __root from '../lib/__root.mjs';
import branch from '../lib/branch.mjs';
import {commitMsg} from '../lib/commit-msg.mjs';

if (process.platform === 'win32')
  throw new Error(
    'commit-status is not supported on Windows! Sorry for inconvenience!'
  );

/**
 * @constant
 * @type {Function}
 * Promisify the 'exec' function
 */
const execPromises = promisify(exec);

/**
 * Check is 'commitMsg' (commit message) is equal to 'docs: undefined'
 */
if (commitMsg === 'Docs: undefined') {
  /**
   * Log the message
   */
  console.log('There are no changes to commit yet.');

  /**
   * Exit the process
   */
  // eslint-disable-next-line no-process-exit
  process.exit(0);
}

/**
 * @constant
 * @type {string[]}
 * 'git commit' command options
 */
const commitOptions = ['-m', `"${commitMsg}"`];

/**
 * @constant
 * @type {string[]}
 * 'git push' command options
 */
const pushOptions = ['-u', 'origin', branch];

/**
 * @constant
 * @type {string[]}
 * 'git' commands
 */
const commands = [
  `commit ${commitOptions.join(' ')}`,
  `push ${pushOptions.join(' ')}`,
];

/**
 * @constant
 * @type {string}
 * Execute 'git' commands
 */
for (const command of commands) {
  /**
   * Execute 'git' command
   */
  const {stdout, stderr} = await execPromises(`git ${command}`, {
    cwd: __root,
  });

  /**
   * Log the error message of 'git' command (if got an error)
   */
  if (stderr) console.error(stderr);

  /**
   * Log the output of 'git' command
   */
  if (stdout) console.log(stdout);
}
