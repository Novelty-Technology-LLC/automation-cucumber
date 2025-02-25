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
    cy.get('[data-cy="input_queue-name"]').type("Automation");
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
  cy.get('[data-cy="input_user-autocomplete"]').click().wait(1000).type('{downarrow}').type('{enter}');
});

And('I click the Save button on modal', () => {
  cy.get('[data-cy="assignee-save-btn"]').click();
  cy.reload();
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
  cy.get('[data-cy="input_queue-name"]').clear().type("Signature"); 
  cy.get('body').type('{esc}');
});

And('I update queue details', () => {
  cy.get('[data-cy="queue-submit-btn"]').click()
});

Then("I should see error message while editing the queue", () => {
  cy.get('[data-cy="queue-error-msg"]').should('be.visible')
 });

When("I verify that a queue does not contain any tasks", () => {
  cy.get('[data-cy="header-ar module"]').click();
  cy.get('[data-cy="queue-header"]')
    .then(($queues) => {
      let found = false;
      $queues.each((index, queue) => {
        if (found) return false; // Breaks out of the loop manually
        const queueText = Cypress.$(queue).text().trim(); // Get queue name synchronously
        cy.get('[data-cy="queue-count"]').wait(1000)
          .eq(index)
          .invoke("text")
          .then((countText) => {
            const count = parseInt(countText.trim(), 10);
            if (count === 0) {
              cy.wrap(queueText).as("Queue");
              cy.wrap(count).as("selectedQueueCount");
              cy.log(`Queue: ${queueText}, Count: ${count}`);
              found = true; // Stop further execution
            }
          });
      });
    });
});

And('I confirm queue deletion', () => {
    cy.get('[data-cy="header-setting"]').click();
    cy.get('[data-cy="sidebar-queue-management"]').click();
    cy.get('@Queue').then((queueText) => {
    cy.log("Queue Name Found:", queueText); // Debugging
    cy.wait(1000);
    // **Find the correct queue row dynamically**
    cy.get('table tr').each(($row) => {
      cy.wrap($row)
        .find('th:nth-child(1)') // Locate the queue name
        .invoke('text')
        .then((text) => {
          if (text.trim() === queueText) {
            cy.log("Delete Queue Name:", queueText);
            cy.wrap($row)
              .get('[data-cy="queue_table-ellipsis-menu"]').eq(0)
              .click().wait(3000).get('[data-cy="queue_delete-btn"]').click();
              cy.get('[data-cy="queue-delete-btn"]').click();
          }
        });
    });
  });
});

Then("I should see a success message 'Queue deleted successfully'", () => {
    cy.get('[data-cy="snackbar-queue-delete"]').contains('Queue deleted successfully.').should('be.visible');
    cy.reload();
});

When("I verify that a queue contains tasks ", () => {
  cy.get('[data-cy="header-ar module"]').click();
  cy.get('[data-cy="queue-header"]')
    .then(($queues) => {
      let found = false;
      $queues.each((index, queue) => {
        if (found) return false; // Breaks out of the loop manually
        const queueText = Cypress.$(queue).text().trim(); // Get queue name synchronously
        cy.get('[data-cy="queue-count"]').wait(1000)
          .eq(index)
          .invoke("text")
          .then((countText) => {
            const count = parseInt(countText.trim(), 10);
            if (count > 0) {
              cy.wrap(queueText).as("selectedQueue");
              cy.wrap(count).as("selectedQueueCount");
              cy.log(`Selected Queue: ${queueText}, Count: ${count}`);
              found = true; // Stop further execution
            }
          });
      });
    });
});

And('I confirm the deletion of the queue, which contains a task.', () => {
  cy.get('[data-cy="header-setting"]').click();
    cy.get('[data-cy="sidebar-queue-management"]').click();
    cy.get('@selectedQueue').then((queueText) => {
    cy.log("Queue Name Found:", queueText); // Debugging
    cy.wait(1000);
    // **Find the correct queue row dynamically**
    cy.get('table tr').each(($row) => {
      cy.wrap($row)
        .find('th:nth-child(1)') // Locate the queue name
        .invoke('text')
        .then((text) => {
          if (text.trim() === queueText) {
            cy.log("Delete Queue Name:", queueText);
            cy.wrap($row)
              .find('[data-cy="queue_table-ellipsis-menu"]')
              .click().wait(3000).get('[data-cy="queue_delete-btn"]').click();
              cy.get('[data-cy="queue-delete-btn"]').wait(1000).click();
          }
        });
    });
  });
});

Then("I should see error message for queue with task", () => {
    cy.get('[data-cy="snackbar-queue-delete-error"]').should('be.visible')
});

