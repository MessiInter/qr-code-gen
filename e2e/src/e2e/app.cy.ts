import { Decoder } from '@nuintun/qrcode';

const decoder: Decoder = new Decoder();

describe('e2e', () => {
  let imageSrc: string = '';

  beforeEach(() => cy.visit('/'));

  it('should render', () => cy.get('qr-code-gen-root').should('exist'));

  it('should takes qrcode screenshot', () =>
    cy.get('.qrcode qrcode').screenshot('qrcode', {
      onAfterScreenshot($el, { path }) {
        imageSrc = path;
      },
    }));

  it(`qrcode data after decode should equal to 'https://github.com/MessiInter/qr-code-gen'`, () =>
    decoder
      .scan(imageSrc)
      .then(({ data }) =>
        expect(data).to.equal('https://github.com/MessiInter/qr-code-gen')
      ));
});
