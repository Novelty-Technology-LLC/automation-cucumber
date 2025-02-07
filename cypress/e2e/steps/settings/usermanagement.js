import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

 Given("I am on the User Management page", () => {
    cy.visit(Cypress.env("BASE_URL"));
    cy.get('input[data-cy="login_username-input"]').type(Cypress.env("USER_EMAIL"));
    cy.get('input[data-cy="login_password-input"]').type(Cypress.env("PASSWORD"));
    cy.get('button[type="submit"]').click();
    cy.viewport(1380, 720);
    cy.get('[data-cy="header-setting"]').click();
  });

 When("I click the Add User button", () => {
    cy.get('[data-cy="user-add-btn"]').click();
  });

  And('I enter valid user details', () => {
    cy.get('[data-cy="user_form-firstname-input"]').type("Deepsana");
    cy.get('[data-cy="user_form-lastname-input"]').type("Thapa");
    cy.get('[data-cy="user_form-dob-input"]').type('04/10/1981');
    cy.get('[data-cy="user_form-gender-input"]').click({ force: true });
    cy.get('[data-cy=gender-female]').click(); 
    cy.get('[data-cy=user_form-role-input]').click({ force: true });
    cy.get('[data-cy=role-representative]').click();
    cy.get('[data-cy="user_form-email-input"]').type('deepsana+1@noveltytechnology.com');
  });
  
 And("I click the Save button", () => {
    cy.get('[data-cy=user_form-submit-btn]').click();
  });

 Then("I should see a success message 'User added successfully'", () => {
    cy.get('#notistack-snackbar').contains('User created successfully.').should('be.visible');
    cy.get('[data-cy="btn_save"]').click();
  });

  And("The new user should appear in the user list", () => {
    cy.get('.MuiTable-root.MuiTable-stickyHeader.css-1heegjx tbody tr:contains("Deepsana Thapa")').should('have.length', 2).then(($row) => expect($row.index()).to.eq(0));
  });

  And('I leave required fields empty', () => {
    cy.get('[data-cy="user_form-firstname-input"]').type(" ");
    cy.get('[data-cy="user_form-lastname-input"]').type(" ");
    cy.get('[data-cy="user_form-email-input"]').type(" ");
   });
  
   Then("I should see validation messages for missing fields", () => {
    cy.get('[data-cy="user_form-firstname-helpertext"]').should('be.visible')
    });
 
  And('I enter an invalid email format', () => {
    cy.get('[data-cy="user_form-firstname-input"]').type("deepsna");
    cy.get('[data-cy="user_form-lastname-input"]').type("thapa");
    cy.get('[data-cy="user_form-email-input"]').type("deepsana@");
   });

   Then("I should see validation message", () => {
    cy.get('[data-cy="user_form-email-helpertext"]').should('be.visible')
    });

   Then("I should see error message", () => {
     cy.get('.MuiAlert-message.css-h62sc9').should('be.visible')
    });
    
  When("I click the edit button", () => {
    cy.get('[data-cy="user_table-ellipsis-menu"]').first().click().wait(3000).get('[data-cy="user_edit-btn"]').click()
    });

  And("I update the user details", () => {
    cy.get('[data-cy="user_form-phone-input"]').type("1234567896")
   });

  And("I click the Update button", () => {
    cy.get('[data-cy="user_form-submit-btn"]').click();
   });

 Then("I should see a success message 'User updated successfully'", () => {
    cy.get('#notistack-snackbar').contains('User updated successfully.').should('be.visible');
  });

  When("I click the delete button", () => {
    cy.get('[data-cy="user_table-ellipsis-menu"]').first().click().wait(3000).get('[data-cy="user_delete-btn"]').click();
    });

  And("I click the confirm button", () => {
     cy.get('[data-cy="btn_save"]').click();
   });

   Then("I should see a success message 'User deleted successfully'", () => {
    cy.get('#notistack-snackbar').contains('User deleted successfully.').should('be.visible');
  });