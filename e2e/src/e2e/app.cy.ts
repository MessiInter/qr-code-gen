import { navigate } from '../support/app.po';

describe('e2e', () => {
  beforeEach(navigate);

  it('should load the example fixture', () => cy.fixture('example'));
});
