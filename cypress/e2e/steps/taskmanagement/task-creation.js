import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { taskCreationPage } from "../../pages/taskmanagement/task-creationpage.js";
import { loginPage } from "../../pages/authentication/loginpage.js";

When("I upload IB Excel file and IBD Excel file to SFTP server", () => {
  taskCreationPage.uploadIBAndIBDFiles();
});

When("I upload 835 EDI file to SFTP server", () => {
  taskCreationPage.upload835EDIFile();
});

When("I am logged into the system", () => {
  loginPage.visit();
  loginPage.loginValidUser();
});

When("I am on the AR-module", () => {
  taskCreationPage.goToARModule();
});

Then("A task should be created and placed in the Commercial queue", () => {
  taskCreationPage.verifyInvoiceBillingTaskCreated();
});
