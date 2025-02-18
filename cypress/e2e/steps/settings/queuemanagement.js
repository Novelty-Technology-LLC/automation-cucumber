import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

 Given("I am on the Queue Management page", () => {
    cy.visit(Cypress.env("BASE_URL"));
    cy.get('input[data-cy="login_username-input"]').type(Cypress.env("USER_EMAIL"));
    cy.get('input[data-cy="login_password-input"]').type(Cypress.env("PASSWORD"));
    cy.get('button[type="submit"]').click();
    cy.viewport(1380, 720);
    cy.get('[data-cy="header-setting"]').click();
    cy.get('[data-cy="sidebar-queue-management"]').click();
  });

 When("I click the Add Queue button", () => {
    cy.get('[data-cy="queue_add-btn"]').click();
  });

  And('I enter valid queue details', () => {
    cy.get('[data-cy="input_queue-name"]').type("example");
    cy.get('#processingType').click();
    cy.get('[data-cy="processingType-automatic"]').click();
    cy.get('#tags').click(); 
    cy.get('li[data-value="Medical Record/EOB"]').click(); 
    cy.get('body').type('{esc}');
  });
  
 And("I click the Save button on add queue modal", () => {
    cy.get('[data-cy=queue-submit-btn]').click();
  });

 Then("I should see a success message 'Queue added successfully'", () => {
    cy.get('[data-cy="snackbar-queue-add"]').contains('Queue created successfully.').should('be.visible');
    cy.reload();
  });

And("The new queue should appear in the queue list", () => {
    cy.get('[data-cy="queue-table-header"]').each(($el) => {
      const text = $el.text().trim();
      if (text === 'example') {
        cy.wrap($el).should('be.visible');
      }
    });
});

When("I click the Assign Representative button", () => {
  cy.get('[data-cy="queue_table-ellipsis-menu"]').first().click().wait(3000).get('[data-cy="queue_assign-representative-btn"]').click();
});

And('I enter the representative name', () => {
  cy.get('[data-cy="input_user-autocomplete"]').type('Deepsana Thapa');
  cy.wait(1000)
  cy.get('[data-cy="input_user-autocomplete"]').wait(1000).type('{downarrow}').type('{enter}');
});

And('I click the Save button on modal', () => {
  cy.get('[data-cy="assignee-save-btn"]').click();
});

Then("I should see assigned reps", () => {
  cy.get('[data-cy="queue-table-header-assigned"]').each(($el) => {
      const text = $el.text().trim();
      if (text === 'Deepsana') {
        cy.wrap($el).should('be.visible');
      }
    });
});

And('I click the cross icon of assigned representative', () => {
  cy.get('[data-cy="btn_remove-assigned-user"]').click();
});

And('I leave required fields empty', () => {
 cy.get('[data-cy="input_queue-name"]').type(" ");
});

Then("I should see validation messages for missing fields", () => {
 cy.get('[data-cy="helpertext_queue-name"]').should('be.visible')
});

And('I enter duplicate queue name', () => {
    cy.get('[data-cy="input_queue-name"]').type("example");
    cy.get('#processingType').click();
    cy.get('[data-cy="processingType-automatic"]').click();
    cy.get('#tags').click(); 
    cy.get('li[data-value="Medical Record/EOB"]').click(); 
    cy.get('body').type('{esc}');
});

Then("I should see error message for duplicate queue", () => {
 cy.get('[data-cy="queue-error-msg"]').should('be.visible')
});

When("I click the Edit button of particular queue", () => {
  cy.get('[data-cy="queue_table-ellipsis-menu"]').first().click().wait(3000).get('[data-cy="queue_edit-btn"]').click();
});

And('I edit with duplicate queue name', () => {
  cy.get('[data-cy="input_queue-name"]').type("example"); 
  cy.get('body').type('{esc}');
});

And('I update queue details', () => {
  cy.get('[data-cy="queue-submit-btn"]').click()
});

Then("I should see error message while editing the queue", () => {
  cy.get('[data-cy="queue-error-msg"]').should('be.visible')
 });

When("I verify that the queue does not contain any tasks", () => {
    cy.get('[data-cy="header-ar module"]').click()
    cy.get('[data-cy="queue-header"]').contains('example').should('be.visible').wait(1000).get('[data-cy="queue-count"]').should('contain', '0'); 
});

And("I click the Delete button of particular queue", () => {
    cy.get('[data-cy="header-setting"]').click();
    cy.get('[data-cy="sidebar-queue-management"]').click();
    cy.get('[data-cy="queue_table-ellipsis-menu"]').first().click().wait(3000).get('[data-cy="queue_delete-btn"]').click();
    cy.get('[data-cy="queue-delete-btn"]').click(); 
});

And('I confirm queue deletion', () => {
    cy.get('[data-cy="queue-delete-btn"]').click();
});

Then("I should see a success message 'Queue deleted successfully'", () => {
    cy.get('[data-cy="snackbar-queue-delete"]').contains('Queue deleted successfully.').should('be.visible');
    cy.reload();
});

When("I verify that the queue contains a task", () => {
  cy.get('[data-cy="header-ar module"]').click()
    cy.get('[data-cy="queue-header"]').wait(1000).eq(5).contains('Wm Roob').should('be.visible').get('[data-cy="queue-count"]').invoke('text')
  .then((text) => {
    const count = parseInt(text.trim(), 10);
    expect(count).to.be.greaterThan(0);
  });
});

Then("I should see error message for queue with task", () => {
    cy.get('[data-cy="queue-error-msg"]').should('be.visible')
});

