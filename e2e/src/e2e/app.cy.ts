import { Decoder } from '@nuintun/qrcode';

const { scan } = new Decoder();
const download: string = Cypress.config('downloadsFolder');

describe('e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should render', () => {
    cy.get('qr-code-gen-root').should('exist').should('be.visible');
  });

  it('should render qrcode', () => {
    cy.get('.qrcode qrcode').should('exist').should('be.visible');
  });

  it('download button should work (img/png)', () => {
    cy.get('.download-btn button').should('exist').should('be.visible').click();
  });

  it('download files should exist', () => {});

  it('qrcode files after decode should be correct', () => {});
});
