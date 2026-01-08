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
    cy.get('[data-cy="move-queue-select"]', { timeout: 10000 })
      .click();
    cy.get(`[data-cy="queue-option-${queueName}"]`)
      .click();
    cy.wait(500);
  }

  confirmMoveAction() {
    cy.get('[data-cy="move-confirm-btn"]', { timeout: 10000 })
      .click();
    cy.wait(2000);
  }

  verifyTaskMovedToTargetQueue() {
    cy.get('[data-cy="queue-header"]', { timeout: 20000 })
      .should('be.visible');
  }

  verifyTaskInTargetQueue(queueName) {
    cy.get('[data-cy="queue-header"]', { timeout: 20000 })
      .contains(queueName)
      .should('be.visible');
    cy.get('[data-cy="task-list-item-button"]', { timeout: 20000 })
      .should('be.visible');
  }

  // Reassign Back Actions
  clickReassignBackAction() {
    cy.get('[data-cy="task-reassign-back-action"]', { timeout: 10000 })
      .click();
    cy.wait(500);
  }

  confirmReassignBackAction() {
    cy.get('[data-cy="reassign-back-confirm-btn"]', { timeout: 10000 })
      .click();
    cy.wait(2000);
  }

  verifyTaskReassignedBackToOriginalQueue(originalQueueName) {
    cy.get('[data-cy="queue-header"]', { timeout: 20000 })
      .contains(originalQueueName)
      .should('be.visible');
    cy.get('[data-cy="task-list-item-button"]', { timeout: 20000 })
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
    cy.get('[data-cy="task-user-avatar"]', { timeout: 10000 })
      .click();
    cy.wait(500);
  }

  selectUserFromDropdown(userName) {
    cy.get(`[data-cy="user-option-${userName}"]`, { timeout: 10000 })
      .click();
    cy.wait(2000);
  }

  verifyTaskAssignedToUser(userName) {
    cy.get('[data-cy="task-assigned-chip"]', { timeout: 10000 })
      .should('be.visible')
      .and('contain', userName);
  }

  // Unassign Task Actions
  selectUnassignedFromDropdown() {
    cy.get('[data-cy="user-option-Unassigned"]', { timeout: 10000 })
      .click();
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
