import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { taskCreationPage } from "../../pages/taskmanagement/task-creationpage.js";
import { loginPage } from "../../pages/authentication/loginpage.js";

When("I upload IB Excel file and IBD Excel file to SFTP server", () => {
  taskCreationPage.uploadIBAndIBDFiles();
});

When("I upload 835 EDI file to SFTP server", () => {
  taskCreationPage.upload835EDIFile();
});

When("I upload IB Excel file and IBD Excel file to SFTP server for Commercial queue", () => {
  taskCreationPage.uploadIBAndIBDFilesForCommercial();
});

When("I upload 835 EDI file to SFTP server for Commercial queue", () => {
  taskCreationPage.upload835EDIFileForCommercial();
});

When("I upload IB Excel file and IBD Excel file to SFTP server for Signature queue", () => {
  taskCreationPage.uploadIBAndIBDFilesForSignature();
});

When("I upload 835 EDI file to SFTP server for Signature queue", () => {
  taskCreationPage.upload835EDIFileForSignature();
});

When("I am logged into the system", () => {
  loginPage.visit();
  loginPage.loginValidUser();
});

When("I am on the AR-module", () => {
  taskCreationPage.goToARModule();
});

Then("A task should be created and placed in the Commercial queue", () => {
  taskCreationPage.verifyTaskCreatedInCommercialQueue();
});

Then("A task should be created and placed in the Signature queue", () => {
  taskCreationPage.verifyTaskCreatedInSignatureQueue();
});

When("I upload IB Excel file and IBD Excel file to SFTP server for AHF queue", () => {
  taskCreationPage.uploadIBAndIBDFilesForAHF();
});

When("I upload 835 EDI file to SFTP server for AHF queue", () => {
  taskCreationPage.upload835EDIFileForAHF();
});

When("I upload IB Excel file and IBD Excel file to SFTP server for Medicare queue", () => {
  taskCreationPage.uploadIBAndIBDFilesForMedicare();
});

When("I upload 835 EDI file to SFTP server for Medicare queue", () => {
  taskCreationPage.upload835EDIFileForMedicare();
});

When("I upload IB Excel file and IBD Excel file to SFTP server for Medical queue", () => {
  taskCreationPage.uploadIBAndIBDFilesForMedical();
});

When("I upload 835 EDI file to SFTP server for Medical queue", () => {
  taskCreationPage.upload835EDIFileForMedical();
});

Then("A task should be created and placed in the AHF queue", () => {
  taskCreationPage.verifyTaskCreatedInAHFQueue();
});

Then("A task should be created and placed in the Medicare queue", () => {
  taskCreationPage.verifyTaskCreatedInMedicareQueue();
});

Then("A task should be created and placed in the Medical queue", () => {
  taskCreationPage.verifyTaskCreatedInMedicalQueue();
});
