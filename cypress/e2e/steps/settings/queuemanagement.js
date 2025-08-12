import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { loginPage } from '../../pages/authentication/loginpage.js';
import { queuePage } from "../../pages/setting/queuepage.js";

 Given("I am on the Queue Management page", () => {
    loginPage.visit();
    loginPage.loginValidUser();
    queuePage.navigateToQueueManagement();
  });

 When("I click the Add Queue button", () => {
     queuePage.clickAddQueueButton();
  });

  And('I enter valid queue details', () => {
    queuePage.enterQueueDetails();
  });
  
 And("I click the Save button on add queue modal", () => {
    queuePage.clickSaveQueue();
  });

 Then("I should see a success message 'Queue added successfully'", () => {
    queuePage.verifyQueueAddedSuccess();
  });

And("The new queue should appear in the queue list", () => {
    queuePage.verifyQueueInList();
});

When("I click the Assign Representative button", () => {
  queuePage.clickAssignRepresentative();
});

And('I enter the representative name', () => {
  queuePage.enterRepresentative();
});

And('I click the Save button on modal', () => {
  queuePage.saveAssignedRepresentative();
});

Then("I should see assigned reps", () => {
  queuePage.verifyAssignedRepresentativeVisible();
});

And('I click the cross icon of assigned representative', () => {
  queuePage.removeAssignedRepresentative();
});

And('I leave required fields empty', () => {
 queuePage.leaveRequiredFieldsEmpty();
});

Then("I should see validation messages for missing fields", () => {
 queuePage.verifyValidationMessage();
});

And('I enter duplicate queue name', () => {
   queuePage.enterDuplicateQueueName();
});

Then("I should see error message for duplicate queue", () => {
 queuePage.verifyDuplicateQueueError();
});

When("I click the Edit button of particular queue", () => {
  queuePage.clickEditQueue();
});

And('I edit with duplicate queue name', () => {
  queuePage.editQueueName();
});

And('I update queue details', () => {
  queuePage.clickUpdateQueue();
});

Then("I should see error message while editing the queue", () => {
  queuePage.verifyEditQueueError();
 });

When("I verify that a queue does not contain any tasks", () => {
  queuePage.verifyQueueWithNoTasksAndStoreAlias();
});

And('I confirm queue deletion', () => {
    queuePage.confirmQueueDeletionFromAlias();
});

Then("I should see a success message 'Queue deleted successfully'", () => {
    queuePage.verifyQueueDeleteSuccess();
});

When("I verify that a queue contains tasks", () => {
  queuePage.verifyQueueWithTasksAndStoreAlias();
});

And('I confirm the deletion of the queue, which contains a task.', () => {
  queuePage.confirmDeletionOfQueueWithTask();
});

Then("I should see error message for queue with task", () => {
   queuePage.verifyQueueDeleteError();
});

