import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { taskActionPage } from "../../pages/taskmanagement/task-actionpage.js";
import { loginPage } from "../../pages/authentication/loginpage.js";

// Setup Steps (When/Then for first scenario)
When("Files are loaded in SFTP server", () => {
  taskActionPage.loadFilesInSftp();
});

And("I am logged into the system", () => {
  loginPage.visit();
  loginPage.loginValidUser();
});

And("I am on the AR-module", () => {
  taskActionPage.goToARModule();
});

When("I click on the task", () => {
  taskActionPage.clickOnTask();
});

And("I click on the ellipses menu", () => {
  taskActionPage.clickEllipsesMenu();
});

// Hold Task Steps
And("I click on hold action", () => {
  taskActionPage.clickHoldAction();
});

And("I hold the task for 1 day", () => {
  taskActionPage.holdTaskForOneDay();
});

Then("The task should be on hold for 1 day", () => {
  taskActionPage.verifyHoldSuccessToast();
});

And("I verify the task on hold through the chip on task detail", () => {
  taskActionPage.verifyTaskOnHoldForOneDay();
});

And("I click on on-hold filter on queue", () => {
  taskActionPage.clickOnHoldFilter();
});

And("The task should be visible in the on-hold filter", () => {
  taskActionPage.verifyTaskInOnHoldFilter();
});

And("I click on resume action", () => {
  taskActionPage.clickResumeAction();
});

Then("The task should be resumed", () => {
  taskActionPage.verifyTaskResumed();
});

And("I verify the task is no longer on hold", () => {
  taskActionPage.verifyTaskNoLongerOnHold();
});

// Move Task Steps
let selectedQueueName = "";
let originalQueueName = "";

Given("A task is in {string} queue", (queueName) => {
  originalQueueName = queueName;
  cy.get('[data-cy="queue-header"]', { timeout: 20000 })
    .contains(queueName)
    .should('be.visible');
});

When("I move the task to {string} queue", (targetQueue) => {
  taskActionPage.clickOnTask();
  taskActionPage.clickEllipsesMenu();
  taskActionPage.clickMoveAction();
  selectedQueueName = targetQueue;
  taskActionPage.selectTargetQueue(targetQueue);
  taskActionPage.confirmMoveAction();
});

And("I click on move action", () => {
  taskActionPage.clickMoveAction();
});

And("I select target queue {string}", (queueName) => {
  selectedQueueName = queueName;
  taskActionPage.selectTargetQueue(queueName);
});

And("I confirm the move action", () => {
  taskActionPage.confirmMoveAction();
});

Then("The task should be moved to the target queue", () => {
  taskActionPage.verifyTaskMovedToTargetQueue();
});

And("I verify the task is in the target queue", () => {
  taskActionPage.verifyTaskInTargetQueue(selectedQueueName);
});

// Reassign Back Steps
And("I click on reassign back action", () => {
  taskActionPage.clickReassignBackAction();
});

And("I confirm the reassign back action", () => {
  taskActionPage.confirmReassignBackAction();
});

Then("The task should be reassigned back to {string} queue", (queueName) => {
  taskActionPage.verifyTaskReassignedBackToOriginalQueue(queueName);
});

And("I verify the task is in the original queue", () => {
  taskActionPage.verifyTaskReassignedBackToOriginalQueue(originalQueueName);
});

// Assign Task Steps
let selectedUserName = "";

And("I click on the user avatar", () => {
  taskActionPage.clickUserAvatar();
});


Then("The task should be assigned to the user", () => {
  taskActionPage.verifyTaskAssignedToUser(selectedUserName);
});

And("I verify the task is assigned to the user", () => {
  taskActionPage.verifyTaskAssignedToUser(selectedUserName);
});

// Unassign Task Steps
Given("A task is assigned to a user", () => {
  // Task is already assigned from the previous scenario (Assign task to a user)
  // Verify the task is assigned by checking for the assigned chip
  cy.get('[data-cy="task-assigned-chip"]', { timeout: 10000 })
    .should('be.visible');
  cy.get('[data-cy="task-assigned-chip"]')
    .invoke('text')
    .then((text) => {
      selectedUserName = text.trim();
    });
});

And("I select {string} from dropdown", (option) => {
  if (option === "Unassigned") {
    taskActionPage.selectUnassignedFromDropdown();
  } else {
    selectedUserName = option;
    taskActionPage.selectUserFromDropdown(option);
  }
});

And("I select user {string} from dropdown", (userName) => {
  selectedUserName = userName;
  taskActionPage.selectUserFromDropdown(userName);
});

Then("The task should be unassigned", () => {
  taskActionPage.verifyTaskUnassigned();
});

And("I verify the task is no longer assigned to any user", () => {
  taskActionPage.verifyTaskNoLongerAssigned();
});
