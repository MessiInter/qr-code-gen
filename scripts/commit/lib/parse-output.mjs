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
 * This file export the 'parseOutput' function that
 * used to parse the output of any command
 */

/**
 * @function
 * @name parseOutput
 * @description Used to parse the output of any command
 * @param {string} output - Output of any command
 * @param {RegExp} regex - Regular expression that will be used to split the output
 * @param {number} idx - Index of the array after split the output string
 * @returns {string} - The parsed output
 * @exports parseOutput - Export the 'parseOutput' function
 * @throws {Error} - Throw error
 */
export function parseOutput(output, regex, idx = 0) {
  /**
   * @throws {Error}
   * Check 'output' argument is a string and  a empty string
   */
  if (output === '')
    throw new Error(
      '"output" argument must be a string and a non-empty string!'
    );

  /**
   * @throws {Error}
   * Check 'regex' argument is a regular expression
   */
  if (!(regex instanceof RegExp))
    throw new Error('"regex" argument must be a regular expression!');

  /**
   * @throws {Error}
   * Check 'idx' argument is a number and a positive number
   */
  if (typeof idx !== 'number' && idx < 0)
    throw new Error('"idx" argument must be a number and a positive number!');

  /**
   * @constant
   * @type {string[]}
   * Split the output
   */
  const lines = output.split(regex);

  /**
   * Return the parsed output
   */
  return lines[idx];
}
