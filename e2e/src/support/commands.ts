/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    // login(email: string, password: string): void;
    getFiles(dir: string, pattern?: string): string[];
    checkFiles(dir: string, pattern?: string): void;
  }
}
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => {
//   console.log('Custom command example: Login', email, password);
// });
Cypress.Commands.add('getFiles', (dir, pattern = '*') => {
  let files: string[] = [];

  cy.exec(`ls --color=never ${dir}/${pattern}`).then(
    ({stdout}: {stdout: string}) => {
      files = stdout.split(/\r\n|\n|\r/g);
    }
  );
  return files;
});

Cypress.Commands.add('checkFiles', (dir, pattern = '*') => {
  let files: string[] = [];

  cy.exec(`ls --color=never ${dir}/${pattern}`).then(
    ({stdout}: {stdout: string}) => {
      files = stdout.split(/\r\n|\n|\r/g);
    }
  );
  files.forEach((file: string) =>
    cy.readFile(`${dir}/${file}`).should('exist')
  );
});
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
