
class LoginPage {
  visit() {
    cy.visit(`${Cypress.env("BASE_URL")}/login`);
  }
  
    enterUsername(username) {
    cy.get('[data-cy="login_username-input"]').type(username);
  }

  enterPassword(password) {
    cy.get('[data-cy="login_password-input"]').type(password);
  }
  
  loginValidUser() {
    this.enterUsername(Cypress.env("USER_EMAIL"));
    this.enterPassword(Cypress.env("PASSWORD"));
    this.clickLoginButton();
  }

  loginInvalidUser() {
    this.enterUsername("example");
    this.enterPassword("example");
    this.clickLoginButton();
  }

  loginWithEmptyFields() {
    this.enterUsername(" ");
    this.enterPassword(" ");
    this.clickLoginButton();
  }

  clickLoginButton() {
    cy.get('button[type="submit"]').click();
  }

  verifyDashboardUrl() {
    cy.url().should("eq", `${Cypress.env("BASE_URL")}/dashboard`);
  }

  verifyLoginError() {
    cy.get('[data-cy="login_error-div"]').should('be.visible');
  }

  verifyValidationMessage() {
    cy.get('[data-cy="login_username-helpertext"]').should('be.visible');
  }
}

export const loginPage = new LoginPage();

