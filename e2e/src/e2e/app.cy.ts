describe('e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should render', () => {
    cy.get('main').should('exist');
  });
});
