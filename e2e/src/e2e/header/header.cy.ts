/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at https://github.com/MessiInter/qr-code-gen/blob/master/LICENSE.md
 */

/**
 * This code will be used to test the
 * header component of the app
 */

describe('header', () => {
  beforeEach(() => cy.visit('/'));

  it('should render header', () =>
    cy.get('qr-code-gen-header').should('exist').should('be.visible'));
});
