describe('e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should loads the example fixture', () => cy.fixture('example'));
});
