import { taskCreationPage } from './task-creationpage.js';

class TaskActionPage {
  loadFilesInSftp() {
    taskCreationPage.uploadIBAndIBDFilesForCommercial();
    taskCreationPage.upload835EDIFileForCommercial();
  }

  goToARModule() {
    taskCreationPage.goToARModule();
    cy.refresh();
    cy.wait(1000);
  }

  clickOnTask() {
    cy.get('[data-cy="task-list-item-button"]', { timeout: 20000 })
      .first()
      .click();
    cy.wait(1000);
  }

  clickOnTaskByIdentifier(taskIdentifier) {
    cy.get('[data-cy="task-list-item-button"]', { timeout: 20000 })
      .contains(taskIdentifier)
      .click();
    cy.wait(1000);
  }

  getTaskIdentifier() {
    return cy.get('[data-cy="task-identifier"]', { timeout: 10000 })
      .invoke('text')
      .then((text) => {
        return text.trim();
      });
  }

  getTaskIdentifierFromDetail() {
    return cy.get('[data-cy="task-identifier"]', { timeout: 10000 })
      .invoke('text')
      .then((text) => {
        return text.trim();
      });
  }

  getTaskNumberFromList() {
    return cy.get('[data-cy="task-list-item-button"]', { timeout: 20000 })
      .first()
      .invoke('text')
      .then((text) => {
        // Extract task number from the text (assuming format like "Task 12345" or just "12345")
        return text.trim();
      });
  }

  clickEllipsesMenu() {
    cy.get('[data-cy="task-ellipses-menu"]', { timeout: 10000 })
      .click();
    cy.wait(500);
  }

  // Hold Task Actions
  clickHoldAction() {
    cy.get('[data-cy="task-hold-action"]', { timeout: 10000 })
      .click();
    cy.wait(500);
  }

  holdTaskForOneDay() {
    cy.get('[data-cy="item_1 Day"]', { timeout: 10000 })
      .click();
    cy.wait(2000);
    cy.get('[data-cy="btn_confirm"]', { timeout: 10000 }).click();
    cy.wait(1000);
    cy.get('[data-cy="task-list-item-button"]', { timeout: 20000 })
      .first()
      .click();
  }

  verifyTaskOnHoldForOneDay() {
    cy.get('[data-cy="task-details-hold-chip"]', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'On Hold for 1 day');
      cy.wait(2000);
  }

  verifyHoldSuccessToast() {
    cy.get('#notistack-snackbar', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Task set on hold successfully');
      cy.wait(2000);
  }

  clickOnHoldFilter() {
    cy.get('[data-cy="on-hold-filter"]', { timeout: 10000 }).click({force: true});
    cy.wait(2000);
  }

  verifyTaskInOnHoldFilter() {
    cy.get('[data-cy="task-list-item"]', { timeout: 20000 })
      .should('be.visible');
    cy.get('[data-cy="task-hold-chip"]', { timeout: 10000 })
      .should('be.visible');
  }

  // Resume Task Actions
  clickResumeAction() {
    cy.get('[data-cy="task-resume-action"]', { timeout: 10000 })
      .click();
    cy.wait(500);
    cy.get('[data-cy="btn_confirm"]', { timeout: 10000 }).click();
    cy.wait(1000);
    cy.get('[data-cy="task-list-item-button"]', { timeout: 20000 })
      .first()
      .click();
  }

  verifyTaskResumed() {
    cy.get('#notistack-snackbar', { timeout: 10000 })
    .should('be.visible')
    .and('contain', 'Task on hold resumed successfully');
    cy.wait(2000);
  }

  verifyTaskNoLongerOnHold() {
    cy.get('[data-cy="task-hold-chip"]', { timeout: 10000 })
      .should('not.exist');
  }

  // Move Task Actions
  clickMoveAction() {
    cy.get('[data-cy="task-move-action"]', { timeout: 10000 })
      .click();
    cy.wait(500);
  }

  selectTargetQueue(queueName) {
    // Then select the queue from dropdown using the queueName parameter
    cy.get(`[data-cy="item_${queueName}"]`, { timeout: 10000 })
      .click();
    cy.wait(500);
  }

  confirmMoveAction() {
    cy.get('[data-cy="btn_confirm"]', { timeout: 10000 })
      .click();
    cy.wait(2000);
  }

  verifyTaskMovedToTargetQueue() {
    cy.get('[data-cy="queue-header"]', { timeout: 20000 })
      .should('be.visible');
  }

  verifyTaskInTargetQueue(queueName, taskIdentifier) {
    cy.get('[data-cy="queue-header"]', { timeout: 20000 })
      .contains(queueName)
      .should('be.visible');
    
    // Verify the specific task is in the target queue
    cy.get('[data-cy="task-list-item-button"]', { timeout: 20000 })
      .contains(taskIdentifier)
      .should('be.visible');
  }

  // Reassign Back Actions
  clickReassignBackAction() {
    cy.get('[data-cy="task-reassign-back-action"]', { timeout: 10000 })
      .click();
    cy.wait(500);
  }

  confirmReassignBackAction() {
    cy.get('[data-cy="btn_confirm"]', { timeout: 10000 })
      .click();
    cy.wait(2000);
  }

  verifyTaskReassignedBackToOriginalQueue(originalQueueName, taskIdentifier) {
    cy.get('[data-cy="queue-header"]', { timeout: 20000 })
      .contains(originalQueueName)
      .should('be.visible');
    
    // Verify the specific task is in the original queue
    cy.get('[data-cy="task-list-item-button"]', { timeout: 20000 })
      .contains(taskIdentifier)
      .should('be.visible');
  }

  getCurrentQueueName() {
    return cy.get('[data-cy="queue-header"]', { timeout: 10000 })
      .invoke('text')
      .then((text) => {
        return text.trim();
      });
  }

  // Assign Task Actions
  clickUserAvatar() {
    cy.get('[data-cy="task-list-item-assign-task-to"]', { timeout: 10000 })
      .click();
    cy.wait(500);
  }

  clickAssignedUserAvatar() {
    cy.get('[data-cy="task-user-avatar"]', { timeout: 10000 })
      .should('be.visible')
      .click();
    cy.wait(1500); // Wait for dropdown to fully open
  }

  selectUserFromDropdown(userName) {
    cy.get(`[data-cy="item_${userName}"]`, { timeout: 10000 })
      .should('be.visible')
      .click();
    cy.wait(2000);
  }

  verifyTaskAssignedToUser(userAvatar) {
    // Use a flexible selector that matches any data-cy starting with task-user-avatar
    // and verify it contains the user avatar initials
    cy.get('[data-cy^="task-user-avatar"]', { timeout: 10000 })
      .should('be.visible')
      .and('contain', userAvatar);
  }

  // Unassign Task Actions
  selectUnassignedFromDropdown() {
    // Wait for dropdown menu container to be visible first
    cy.get('[data-cy^="item_"]', { timeout: 20000 })
      .first()
      .should('be.visible');
    
    // Wait a bit more for all items to render
    cy.wait(500);
    
    // Select Unassigned option from dropdown - ensure it's visible and clickable
    cy.get('[data-cy="item_Unassigned "]', { timeout: 20000 })
      .should('exist')
      .should('be.visible')
      .scrollIntoView({ offset: { top: -100, left: 0 } })
      .should('be.visible') // Verify again after scroll
      .click({ force: false });
    cy.wait(2000);
  }

  verifyTaskUnassigned() {
    cy.get('[data-cy="task-assigned-chip"]', { timeout: 10000 })
      .should('not.exist');
  }

  verifyTaskNoLongerAssigned() {
    cy.get('[data-cy="task-assigned-chip"]')
      .should('not.exist');
  }
}

export const taskActionPage = new TaskActionPage();
