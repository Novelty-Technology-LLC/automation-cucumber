
class QueuePage {
  navigateToQueueManagement() {
    cy.viewport(1380, 720);
    cy.get('[data-cy="header-setting"]').click();
    cy.wait(1000);
    cy.get('[data-cy="sidebar-queue-management"]').click();
  }

  clickAddQueueButton() {
    cy.get('[data-cy="queue_add-btn"]').click();
  }

  enterQueueDetails(name = "Automation") {
    cy.get('[data-cy="input_queue-name"]').type(name);
    cy.get('[data-cy="input_queue-tag"]').click();
    cy.get('li[data-value="Medical Record/EOB"]').click();
    cy.get('body').type('{esc}');
    cy.get('[data-cy="switch-auto-assign"]').click();
  }

  clickSaveQueue() {
    cy.get('[data-cy=queue-submit-btn]').click();
  }

  verifyQueueAddedSuccess() {
    cy.get('[data-cy="snackbar-queue-add"]').contains('Queue created successfully.').should('be.visible');
    cy.reload();
  }

  verifyQueueInList(queueName = "Automation") {
    cy.get('[data-cy="queue-table-header"]').each(($el) => {
      if ($el.text().trim() === queueName) {
        cy.wrap($el).should('be.visible');
      }
    });
  }

  clickAssignRepresentative() {
     cy.get('[data-cy="queue_table-ellipsis-menu"]').first().click().wait(3000).get('[data-cy="queue_assign-representative-btn"]').click();
  }

  enterRepresentative(name = "Deepsana Thapa") {
    cy.get('[data-cy="input_user-autocomplete"]').type(name);
    cy.wait(1000);
    cy.get('[data-cy="input_user-autocomplete"]').click().wait(1000).type('{downarrow}{enter}');
  }

  saveAssignedRepresentative() {
    cy.get('[data-cy="assignee-save-btn"]').click();
    cy.reload();
  }

  verifyAssignedRepresentativeVisible(name = "Deepsana") {
    cy.get('[data-cy="queue-table-header-assigned"]').each(($el) => {
      if ($el.text().trim() === name) {
        cy.wrap($el).should('be.visible');
      }
    });
  }

  removeAssignedRepresentative() {
    cy.get('[data-cy="btn_remove-assigned-user"]').click({ force: true });
  }

  leaveRequiredFieldsEmpty() {
    cy.get('[data-cy="input_queue-name"]').type(" ");
  }

  verifyValidationMessage() {
    cy.get('[data-cy="helpertext_queue-name"]').should('be.visible');
  }

  enterDuplicateQueueName(name = "Automation") {
    cy.get('[data-cy="input_queue-name"]').type(name);
    cy.get('[data-cy="input_queue-tag"]').click();
    cy.get('li[data-value="Medical Record/EOB"]').click();
    cy.get('body').type('{esc}');
  }

  verifyDuplicateQueueError() {
    cy.get('[data-cy="queue-error-msg"]').should('be.visible');
  }

  clickEditQueue() {
    cy.get('[data-cy="queue_table-ellipsis-menu"]').first().click().wait(3000).get('[data-cy="queue_edit-btn"]').click();
  }

  editQueueName(name = "Signature") {
    cy.get('[data-cy="input_queue-name"]').clear().type(name);
    cy.get('body').type('{esc}');
  }

  clickUpdateQueue() {
    cy.get('[data-cy="queue-submit-btn"]').click();
  }

  verifyEditQueueError() {
    cy.get('[data-cy="queue-error-msg"]').should('be.visible');
  }

  verifyQueueWithNoTasksAndStoreAlias() {
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
  }

  confirmQueueDeletionFromAlias(alias = '@Queue') {
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
  }

  verifyQueueDeleteSuccess() {
    cy.get('[data-cy="snackbar-queue-delete"]').contains('Queue deleted successfully.').should('be.visible');
    cy.reload();
  }

  verifyQueueWithTasksAndStoreAlias() {
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
  }

  confirmDeletionOfQueueWithTask() {
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
  }

  verifyQueueDeleteError(){
    cy.get('[data-cy="snackbar-queue-delete-error"]').should('be.visible');
  }

}

export const queuePage = new QueuePage();
