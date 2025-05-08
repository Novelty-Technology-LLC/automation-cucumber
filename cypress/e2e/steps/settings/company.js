import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

 Given("I am on the Companies page", () => {
    cy.visit(Cypress.env("BASE_URL"));
    cy.get('input[data-cy="login_username-input"]').type(Cypress.env("USER_EMAIL"));
    cy.get('input[data-cy="login_password-input"]').type(Cypress.env("PASSWORD"));
    cy.get('button[type="submit"]').click();
    cy.viewport(1380, 720);
    cy.get('[data-cy="header-setting"]').click();
    cy.get('[data-cy="sidebar-company"]').click();
  });

 When("I click the Add button on Companies page", () => {
    cy.get('[data-cy="btn_add"]').click();
  });

  And('I enter valid company details', () => {
    cy.get('[data-cy="input_companyName"]').type("Test company");
    cy.get('[data-cy="input_company-code"]').type("a70701");
    cy.get('[data-cy="input_payerId"]').type("0707");
    cy.get('#tpa-company').click();
    cy.get('[data-cy=role-post-n-track]').click();
  });
  
 And("I click the Save button on add company modal", () => {
    cy.get('[data-cy=company-submit-btn]').click();
  });

 Then("I should see a success message 'Company added successfully'", () => {
    cy.get('[data-cy="snackbar-company-add"]').contains('Company created successfully.').should('be.visible');
  });

  And("The new company should appear in the company list", () => {
    cy.get('[data-cy="company-list-table"]').each(($el) => {
      const text = $el.text().trim();
      if (text === 'Test company') {
        cy.wrap($el).should('be.visible');
      }
    });
  });

  And('I leave required fields empty on add company modal', () => {
    cy.get('[data-cy="input_companyName"]').type(" ");
    cy.get('[data-cy="input_company-code"]').type(" ");
    cy.get('[data-cy="input_payerId"]').type(" ");
  });

  Then("I should see validation messages for missing fields on modal", () => {
    cy.get('[data-cy="helpertext_companyName"]').should('be.visible')
    cy.get('[data-cy="helpertext_company-code"]').should('be.visible')
    cy.get('[data-cy="helpertext_payerId"]').should('be.visible')
  });

  And('I enter duplicate company code', () => {
    cy.get('[data-cy="input_companyName"]').type("Test company");
    cy.get('[data-cy="input_company-code"]').type("a70701");
    cy.get('[data-cy="input_payerId"]').type("0707");
    cy.get('#tpa-company').click();
    cy.get('[data-cy=role-post-n-track]').click();
    cy.get('[data-cy=company-submit-btn]').click();
  });

  Then("I should see validation messages'Code already occupied'", () => {
    cy.get('[data-cy="helpertext_company-code"]').should('be.visible')
  });

  When("I click the edit button of particular company", () => {
    cy.get('[data-cy="company-ellipse-btn"]').first().click({force:true}).wait(3000).get('[data-cy="company-add-btn"]').click();
  });

  And("I update the company details", () => {
    cy.get('[data-cy="input_companyName"]').clear().type("Test company1");
  });

  And("I update company details", () => {
    cy.get('[data-cy="company-submit-btn"]').click();
  });
  
  Then("I should see a success message 'Company updated successfully'", () => {
    cy.get('[data-cy="snackbar-company-edit"]').should('be.visible')
    cy.get('[data-cy="company-list-table"]').each(($el) => {
        const text = $el.text().trim();
        if (text === 'Test company1') {
          cy.wrap($el).should('be.visible');
        }
    });
  });

  When("I click the delete button of particular company", () => {
    cy.get('[data-cy="company-ellipse-btn"]').first().click({force:true}).wait(3000).get('[data-cy="company-delete-btn"]').click();
    });

   And("I confirm company deletion", () => {
     cy.get('[data-cy="btn_confirm"]').click();
   });

   Then("I should see a success message 'Company deleted successfully'", () => {
    cy.get('[data-cy="snackbar-company-delete"]').contains('Company deleted successfully.').should('be.visible');
    });