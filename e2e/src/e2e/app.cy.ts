describe('e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should render', () =>
    cy
      .get('qr-code-gen-root')
      .should('be.visible')
      .should('exist')
      .should('be.visible'));

  it('should render qrcode', () => {
    cy.get('.qrcode qrcode').should('exist').should('be.visible');
  });

  it('download button should work (img/png)', () => {
    cy.get('.download-btn button').should('be.visible').click();
  });

  it('show advanced options button should work', () => {
    cy.get('mat-checkbox.options-checkbox').should('be.visible').click();
  });
});
