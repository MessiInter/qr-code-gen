describe('e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should render app', () => {
    cy.get('body').should('exist');
  });
});
