/**
 * @license
 * Copyright MessiInter and contributors All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file at the root of this project.
 */

describe('header', () => {
  beforeEach(() => cy.visit('/'));

  it('should render header', () =>
    cy.get('qr-code-gen-header').should('exist').should('be.visible'));
});
