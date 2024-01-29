/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at https://github.com/MessiInter/qr-code-gen/blob/master/LICENSE.md
 */

/// <reference types="cypress" />
import {Decoder} from '@nuintun/qrcode';
import {join} from 'path';

import {getFiles} from './app.po';

const {scan}: Decoder = new Decoder();

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      // login(email: string, password: string): void;
      checkFiles(dir?: string, pattern?: string): void;
      scanFiles(dir?: string, pattern?: string): void;
    }
  }
}
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => {
//   console.log('Custom command example: Login', email, password);
// });
Cypress.Commands.add('checkFiles', (dir = '.', pattern = '*') => {
  const files: string[] = getFiles(dir, pattern);

  files.forEach((file: string) => {
    const path: string = join(dir, file);

    cy.readFile(path).should('exist');
  });
});

Cypress.Commands.add('scanFiles', (dir = '.', pattern = '*') => {
  const files: string[] = getFiles(dir, pattern);

  files.forEach(async (file: string) => {
    const path: string = join(dir, file);

    expect(await scan(path)).to.be.true;
  });
});
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

export {};
