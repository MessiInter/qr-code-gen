import {Decoder} from '@nuintun/qrcode';
import {DecodeResult} from '@nuintun/qrcode/types/qrcode/decoder/decoder';
import {join} from 'path';

const {scan}: Decoder = new Decoder();
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

  it('the data of qrcode files after decode should be correct', () => {
    const files: string[] = cy.getFiles(downloadsFolder, imagesPattern) ?? [];

    files.forEach((file: string) => {
      const path: string = join(downloadsFolder, file);

      scan(path).then((data: DecodeResult) => expect(data).to.be.true);
    });
  });
});
