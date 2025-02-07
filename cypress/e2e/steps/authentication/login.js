import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

 Given("I visit the login page", () => {
    cy.visit(Cypress.env("BASE_URL"));
  });

 When("I enter valid username and password", () => {
    cy.get('input[data-cy="login_username-input"]').type(Cypress.env("USER_EMAIL"));
    cy.get('input[data-cy="login_password-input"]').type(Cypress.env("PASSWORD"));
    cy.get('button[type="submit"]').click();
  });
  
 Then("I should be redirected to the dashboard", () => {
    cy.url().should("eq", `${Cypress.env("BASE_URL")}/dashboard`);
  });

  When("I enter an invalid username or password", () => {
    cy.get('input[data-cy="login_username-input"]').type("example");
    cy.get('input[data-cy="login_password-input"]').type("example");
    cy.get('button[type="submit"]').click();
  });

  Then("I should see an error message", () => {
    cy.get('[data-cy="login_error-div"]').should('be.visible')
  });

  When("I leave the username and password fields empty", () => {
    cy.get('input[data-cy="login_username-input"]').type(" ");
    cy.get('input[data-cy="login_password-input"]').type(" ");
    cy.get('button[type="submit"]').click();
  });

  And('I click the login button', () => {
    cy.get('button[type="submit"]').click();
  });

  Then("I should see an validation message", () => {
    cy.get('[data-cy="login_username-helpertext"]').should('be.visible')
  });

