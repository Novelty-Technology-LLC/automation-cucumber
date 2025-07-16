import "./commands";
import "cypress-mochawesome-reporter/register";
before(() => {
  // This runs once before all specs
  cy.clearCookies();
  cy.clearLocalStorage();
  Cypress.session.clearAllSavedSessions();

  // cy.getCookies().then(cookies => {
  //   if (!cookies.length) {
  //     cy.log("✅ No cookies present, clean state.");
  //   }
  // });

  cy.login(); // Uses your custom command
});

after(() => {
  // cy.logout();
});
