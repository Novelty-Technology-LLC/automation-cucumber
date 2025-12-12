import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { exceptionTaskPage } from "../../pages/taskmanagement/exception-taskpage.js";
import { loginPage } from "../../pages/authentication/loginpage.js";

When("I upload IB Excel file only to SFTP server for missing service line exception", () => {
  exceptionTaskPage.uploadIBFileOnly();
});

When("I am logged into the system", () => {
  loginPage.visit();
  loginPage.loginValidUser();
});

When("I am on the AR-module", () => {
  exceptionTaskPage.goToARModule();
});

Then("The task should be placed in the Missing Billing queue", () => {
  exceptionTaskPage.verifyTaskInMissingBillingQueue();
});

When("I click on the task for missing service line exception", () => {
  exceptionTaskPage.clickOnTask();
});

Then("The task should contain an accordion with missing service line exception details", () => {
  exceptionTaskPage.verifyMissingServiceLineExceptionAccordion();
});

When("I hover over the missing service line exception accordion", () => {
  exceptionTaskPage.hoverOverAccordion();
});

Then("The missing service line exception detail should be visible and contain exception detail text", () => {
  exceptionTaskPage.verifyExceptionDetailText();
});

When("I upload IBD Excel file to SFTP server to resolve missing service line exception", () => {
  exceptionTaskPage.uploadIBDFile();
});


When("I upload 835 EDI file to SFTP server to resolve missing service line exception", () => {
  exceptionTaskPage.upload835EDIFile();
});

When("I upload 835 EDI file to SFTP server to resolve missing billing info exception", () => {
  exceptionTaskPage.upload835EDIFileForMissingBillingInfo();
});

When("I wait for the exception to be resolved", () => {
  exceptionTaskPage.waitForExceptionResolution();
});

Then("The task should be moved to the Commercial queue", () => {
  exceptionTaskPage.verifyTaskMovedToCommercialQueue();
});

Then("The task should be moved to the Commercial queue for missing billing info", () => {
  exceptionTaskPage.verifyTaskMovedToCommercialQueueForMissingBillingInfo();
});

When("I upload IBD Excel file only to SFTP server for missing billing info exception", () => {
  exceptionTaskPage.uploadIBDFileOnly();
});

When("I click on the task for missing billing info", () => {
  exceptionTaskPage.clickOnTaskForMissingBillingInfo();
});

Then("The task should contain an accordion with missing billing info exception details", () => {
  exceptionTaskPage.verifyMissingBillingInfoExceptionAccordion();
});

When("I hover over the missing billing info accordion", () => {
  exceptionTaskPage.hoverOverMissingBillingInfoAccordion();
});

Then("The missing billing info exception detail should be visible and contain exception detail text", () => {
  exceptionTaskPage.verifyMissingBillingInfoExceptionDetailText();
});

When("I upload IB Excel file to SFTP server to resolve missing billing info exception", () => {
  exceptionTaskPage.uploadIBFile();
});

