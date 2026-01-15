import { taskCreationPage } from './task-creationpage.js';
import { TIMEOUT } from '../../util/constants.js';

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
    cy.get('[data-cy="task-list-item-button"]', { timeout: TIMEOUT.TOO_LONG })
      .first()
      .click();
    cy.wait(1000);
  }

  clickOnTaskByIdentifier(taskIdentifier) {
    cy.get('[data-cy="task-list-item-button"]', { timeout: TIMEOUT.TOO_LONG })
      .contains(taskIdentifier)
      .click();
    cy.wait(1000);
  }

  getTaskIdentifier() {
    return cy.get('[data-cy="task-identifier"]', { timeout: TIMEOUT.LONG })
      .invoke('text')
      .then((text) => {
        return text.trim();
      });
  }

  getTaskIdentifierFromDetail() {
    return cy.get('[data-cy="task-identifier"]', { timeout: TIMEOUT.LONG })
      .invoke('text')
      .then((text) => {
        return text.trim();
      });
  }

  getTaskNumberFromList() {
    return cy.get('[data-cy="task-list-item-button"]', { timeout: TIMEOUT.TOO_LONG })
      .first()
      .invoke('text')
      .then((text) => {
        // Extract task number from the text (assuming format like "Task 12345" or just "12345")
        return text.trim();
      });
  }

  clickEllipsesMenu() {
    cy.get('[data-cy="task-ellipses-menu"]', { timeout: TIMEOUT.LONG })
      .click();
    cy.wait(500);
  }

  // Hold Task Actions
  clickHoldAction() {
    cy.get('[data-cy="task-hold-action"]', { timeout: TIMEOUT.LONG })
      .click();
    cy.wait(500);
  }

  holdTaskForOneDay() {
    cy.get('[data-cy="item_1 Day"]', { timeout: TIMEOUT.LONG })
      .click();
    cy.wait(2000);
  }

  enterNotesForHold(note = "Hold task: Task is on hold now.") {
    cy.get('[data-cy="task-hold-confirm-button-note-input"]', { timeout: TIMEOUT.LONG })
      .should('be.visible')
      .type(note);
    cy.wait(500);
    cy.get('[data-cy="task-hold-confirm-button"]', { timeout: TIMEOUT.LONG }).click();
    cy.wait(1000);
    cy.get('[data-cy="task-list-item-button"]', { timeout: TIMEOUT.TOO_LONG })
      .first()
      .click();
  }

  verifyTaskOnHoldForOneDay() {
    cy.get('[data-cy="task-details-hold-chip"]', { timeout: TIMEOUT.LONG })
      .should('be.visible')
      .and('contain', 'On Hold for 1 day');
      cy.wait(2000);
  }

  verifyHoldSuccessToast() {
    cy.get('#notistack-snackbar', { timeout: TIMEOUT.LONG })
      .should('be.visible')
      .and('contain', 'Task set on hold successfully');
      cy.wait(2000);
  }

  clickOnHoldFilter() {
    cy.get('[data-cy="on-hold-filter"]', { timeout: TIMEOUT.LONG }).click({force: true});
    cy.wait(2000);
  }

  verifyTaskInOnHoldFilter() {
    cy.get('[data-cy="task-list-item"]', { timeout: TIMEOUT.TOO_LONG })
      .should('be.visible');
    cy.get('[data-cy="task-hold-chip"]', { timeout: TIMEOUT.LONG })
      .should('be.visible');
  }

  // Resume Task Actions
  clickResumeAction() {
    cy.get('[data-cy="task-resume-action"]', { timeout: TIMEOUT.LONG })
      .click();
    cy.wait(500);
  }

  enterNotesForResume(note = "Resume task: Task resumed successfully") {
    cy.get('[data-cy="task-resume-confirm-button-note-input"]', { timeout: TIMEOUT.LONG })
      .should('be.visible')
      .type(note);
    cy.wait(500);
    cy.get('[data-cy="task-resume-confirm-button"]', { timeout: TIMEOUT.LONG }).click();
    cy.wait(1000);
    cy.get('[data-cy="task-list-item-button"]', { timeout: TIMEOUT.TOO_LONG })
      .first()
      .click();
  }

  verifyTaskResumed() {
    cy.get('#notistack-snackbar', { timeout: TIMEOUT.LONG })
    .should('be.visible')
    .and('contain', 'Task on hold resumed successfully');
    cy.wait(2000);
  }

  verifyTaskNoLongerOnHold() {
    cy.get('[data-cy="task-hold-chip"]', { timeout: TIMEOUT.LONG })
      .should('not.exist');
  }

  // Move Task Actions
  clickMoveAction() {
    cy.get('[data-cy="task-move-action"]', { timeout: TIMEOUT.LONG })
      .click();
    cy.wait(500);
  }

  selectTargetQueue(queueName) {
    // Then select the queue from dropdown using the queueName parameter
    cy.get(`[data-cy="item_${queueName}"]`, { timeout: TIMEOUT.LONG })
      .click();
    cy.wait(500);
  }

  enterNotesForMove(note = "Move task: Task moved to new queue.") {
    cy.get('[data-cy="task-move-confirm-button-note-input"]', { timeout: TIMEOUT.LONG })
      .should('be.visible')
      .type(note);
    cy.wait(500);
  }

  confirmMoveAction() {
    cy.get('[data-cy="task-move-confirm-button"]', { timeout: TIMEOUT.LONG })
      .click();
    cy.wait(2000);
  }

  verifyTaskMovedToTargetQueue() {
    cy.get('[data-cy="queue-header"]', { timeout: TIMEOUT.TOO_LONG })
      .should('be.visible');
  }

  verifyTaskInTargetQueue(queueName, taskIdentifier) {
    cy.get('[data-cy="queue-header"]', { timeout: TIMEOUT.TOO_LONG })
      .contains(queueName)
      .should('be.visible');
    
    // Verify the specific task is in the target queue
    cy.get('[data-cy="task-list-item-button"]', { timeout: TIMEOUT.TOO_LONG })
      .contains(taskIdentifier)
      .should('be.visible');
  }

  // Reassign Back Actions
  clickReassignBackAction() {
    cy.get('[data-cy="task-reassign-back-action"]', { timeout: TIMEOUT.LONG })
      .click();
    cy.wait(500);
  }

  enterNotesForReassignBack(note = "Reassigning task back to original queue") {
    cy.get('[data-cy="task-reset-confirm-button-note-input"]', { timeout: TIMEOUT.LONG })
      .should('be.visible')
      .type(note);
    cy.wait(500);
  }

  confirmReassignBackAction() {
    cy.get('[data-cy="task-reset-confirm-button"]', { timeout: TIMEOUT.LONG })
      .click();
    cy.wait(2000);
  }

  verifyTaskReassignedBackToOriginalQueue(originalQueueName, taskIdentifier) {
    cy.get('[data-cy="queue-header"]', { timeout: TIMEOUT.TOO_LONG })
      .contains(originalQueueName)
      .should('be.visible');
    
    // Verify the specific task is in the original queue
    cy.get('[data-cy="task-list-item-button"]', { timeout: TIMEOUT.TOO_LONG })
      .contains(taskIdentifier)
      .should('be.visible');
  }

  getCurrentQueueName() {
    return cy.get('[data-cy="queue-header"]', { timeout: TIMEOUT.LONG })
      .invoke('text')
      .then((text) => {
        return text.trim();
      });
  }

  // Assign Task Actions
  clickUserAvatar() {
    cy.get('[data-cy="task-list-item-assign-task-to"]', { timeout: TIMEOUT.LONG })
      .click();
    cy.wait(500);
  }

  clickAssignedUserAvatar() {
    cy.get('[data-cy="task-user-avatar"]', { timeout: TIMEOUT.LONG })
      .should('be.visible')
      .click();
    cy.wait(1500); // Wait for dropdown to fully open
  }

  selectUserFromDropdown(userName) {
    cy.get(`[data-cy="item_${userName}"]`, { timeout: TIMEOUT.LONG })
      .should('be.visible')
      .click();
    cy.wait(2000);
  }

  enterNotesForAssign(note = "Assign user: User assigned to task") {
    cy.get('[data-cy="task-assign-confirm-button-note-input"]', { timeout: TIMEOUT.LONG })
      .should('be.visible')
      .type(note);
    cy.wait(500);
    cy.get('[data-cy="task-assign-confirm-button"]', { timeout: TIMEOUT.LONG })
      .click();
    cy.wait(2000);

  }

  verifyTaskAssignedToUser(userAvatar) {
    cy.get('[data-cy^="task-user-avatar"]', { timeout: TIMEOUT.LONG })
      .should('be.visible')
      .and('contain', userAvatar);
  }

  // Unassign Task Actions
  selectUnassignedFromDropdown() {
    // Wait for dropdown menu container to be visible first
    cy.get('[data-cy^="item_"]', { timeout: TIMEOUT.TOO_LONG })
      .first()
      .should('be.visible');
    
    // Wait a bit more for all items to render
    cy.wait(500);
    
    // Select Unassigned option from dropdown - ensure it's visible and clickable
    cy.get('[data-cy="item_Unassigned "]', { timeout: TIMEOUT.TOO_LONG })
      .should('exist')
      .should('be.visible')
      .scrollIntoView({ offset: { top: -100, left: 0 } })
      .should('be.visible') // Verify again after scroll
      .click({ force: false });
    cy.wait(2000);
  }

  enterNotesForUnassign(note = "Unassign user: User removed from task") {
    cy.get('[data-cy="task-unassign-confirm-button-note-input"]', { timeout: TIMEOUT.LONG })
      .should('be.visible')
      .type(note);
    cy.wait(500);
    cy.get('[data-cy="task-unassign-confirm-button"]', { timeout: TIMEOUT.LONG })
      .click();
    cy.wait(2000);
  }

  verifyTaskUnassigned() {
    cy.get('[data-cy="task-assigned-chip"]', { timeout: TIMEOUT.LONG })
      .should('not.exist');
  }

  verifyTaskNoLongerAssigned() {
    cy.get('[data-cy="task-assigned-chip"]')
      .should('not.exist');
  }
}

export const taskActionPage = new TaskActionPage();
