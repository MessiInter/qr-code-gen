describe('header', () => {
  beforeEach(() => cy.visit('/'));

  it('should render header', () =>
    cy.get('qr-code-gen-header').should('exist').should('be.visible'));
});
