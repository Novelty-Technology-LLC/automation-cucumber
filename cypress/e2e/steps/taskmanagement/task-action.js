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

When("I click on the task {string}", (taskIdentifier) => {
  taskActionPage.clickOnTaskByIdentifier(taskIdentifier);
});

When("I click on the task {string} in {string} queue", (taskIdentifier, queueName) => {
  originalQueueName = "Commercial"; // Set original queue for reassign back verification
  movedTaskIdentifier = taskIdentifier;
  // Find Signature queue header, then find and click the task in that queue section
  cy.get('[data-cy="queue-header"]', { timeout: 20000 })
    .contains(queueName)
    .should('be.visible');
  // Click the task - it should be in the same queue section as the header
  cy.get('[data-cy="task-list-item-button"]', { timeout: 20000 })
    .contains(taskIdentifier)
    .click();
  cy.wait(1000);
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

And("I enter notes for holding the task", () => {
  taskActionPage.enterNotesForHold();
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

And("I enter notes for resuming the task", () => {
  taskActionPage.enterNotesForResume();
});

Then("The task should be resumed", () => {
  taskActionPage.verifyTaskResumed();
});

And("I verify the task is no longer on hold", () => {
  taskActionPage.verifyTaskNoLongerOnHold();
});

// Move Task Steps
let selectedQueueName = "Signature";
let originalQueueName = "Commercial";
let movedTaskIdentifier = "3452772";

And("I click on move action", () => {
  taskActionPage.clickMoveAction();
});

And("I select target queue {string}", (queueName) => {
  selectedQueueName = queueName;
  taskActionPage.selectTargetQueue(queueName);
});

And("I enter notes for moving the task", () => {
  taskActionPage.enterNotesForMove();
});

And("I confirm the move action", () => {
  taskActionPage.confirmMoveAction();
});

Then("The task should be moved to the target queue", () => {
  taskActionPage.verifyTaskMovedToTargetQueue();
});

And("I verify the task is in the target queue", () => {
  taskActionPage.verifyTaskInTargetQueue(selectedQueueName, movedTaskIdentifier);
});

And("I verify the task {string} is in the target queue", (taskIdentifier) => {
  taskActionPage.verifyTaskInTargetQueue(selectedQueueName, taskIdentifier);
});

// Reassign Back Steps
And("I click on reassign back action", () => {
  taskActionPage.clickReassignBackAction();
});

And("I enter notes for reassigning back the task", () => {
  taskActionPage.enterNotesForReassignBack();
});

And("I confirm the reassign back action", () => {
  taskActionPage.confirmReassignBackAction();
});

Then("The task should be reassigned back to {string} queue", (queueName) => {
  taskActionPage.verifyTaskReassignedBackToOriginalQueue(queueName, movedTaskIdentifier);
});

And("I verify the task is in the original queue", () => {
  taskActionPage.verifyTaskReassignedBackToOriginalQueue(originalQueueName, movedTaskIdentifier);
});

And("I verify the task {string} is in the original queue", (taskIdentifier) => {
  taskActionPage.verifyTaskReassignedBackToOriginalQueue(originalQueueName, taskIdentifier);
});

// Assign Task Steps
let assignedUserAvatar = "DT";

And("I click on the user avatar", () => {
  taskActionPage.clickUserAvatar();
});

And("I enter notes for assigning the user", () => {
  taskActionPage.enterNotesForAssign();
});

Then("The task should be assigned to the user", () => {
  taskActionPage.verifyTaskAssignedToUser(assignedUserAvatar);
});

And("I select {string} from dropdown", (option) => {
  if (option === "Unassigned") {
    taskActionPage.selectUnassignedFromDropdown();
  } else {
    taskActionPage.selectUserFromDropdown(option);
  }
});

And("I select user {string} from dropdown", (userName) => {
  taskActionPage.selectUserFromDropdown(userName);
});

// Unassign Task Steps - Used in "Unassign task from a user and verify it is unassigned" scenario
And("I click on the assigned user avatar", () => {
  taskActionPage.clickAssignedUserAvatar();
});

And("I enter notes for unassigning the user", () => {
  taskActionPage.enterNotesForUnassign();
});

Then("The user should be unassigned", () => {
  taskActionPage.verifyTaskUnassigned();
});

And("I verify the task is no longer assigned to any user", () => {
  taskActionPage.verifyTaskNoLongerAssigned();
});
