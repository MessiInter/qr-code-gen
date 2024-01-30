/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at https://github.com/MessiInter/qr-code-gen/blob/master/LICENSE.md
 */

const downloadsFolder: string = Cypress.config('downloadsFolder');
const imagesPattern: string = 'QR_Code_*.png';

describe('e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should render', () =>
    cy.get('qr-code-gen-root').should('exist').should('be.visible'));

  it('should render qrcode', () =>
    cy.get('.qrcode qrcode').should('exist').should('be.visible'));

  it('download button should work (img/png)', () =>
    cy
      .get('.download-btn button')
      .should('exist')
      .should('be.visible')
      .click());

  it('download files should exist', () =>
    cy.checkFiles(downloadsFolder, imagesPattern));

  it('the data of qrcode files after decode should be correct', () =>
    cy.scanFiles(downloadsFolder, imagesPattern));
});
