import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { companyPage } from "../../pages/setting/companypage.js";
import { loginPage } from '../../pages/authentication/loginpage.js';

 Given("I am on the Companies page", () => {
    loginPage.visit();
    loginPage.loginValidUser();
    companyPage.goToCompaniesPage();
  });

 When("I click the Add button on Companies page", () => {
    companyPage.clickAddButton();
  });

  And('I enter valid company details', () => {
    companyPage.enterCompanyDetails({
    name: "Test company",
    code: "a70701",
    payerId: "0707"
  });
  });
  
 And("I click the Save button on add company modal", () => {
    companyPage.saveCompany();
  });

 Then("I should see a success message 'Company added successfully'", () => {
    companyPage.verifySuccessMessage("Company created successfully");
  });

  And("The new company should appear in the company list", () => {
   companyPage.verifyCompanyInList();
  });


  And('I leave required fields empty on add company modal', () => {
    companyPage.leaveRequiredFieldsEmpty();
  });

  Then("I should see validation messages for missing fields on modal", () => {
   companyPage.verifyValidationMessages;
  });

  And('I enter duplicate company code', () => {
    companyPage.enterDuplicateCompanyCode({
    name: "Test company",
    code: "a70701",
    payerId: "0707"
    });
    companyPage.saveCompany();
  });

  Then("I should see validation messages'Code already occupied'", () => {
    companyPage.verifyDuplicateCodeError();
  });

  When("I click the edit button of particular company", () => {
    companyPage.clickCompanyEditButton();
  });

  And("I update the company details", () => {
    companyPage.updateCompanyName("Test company1");
  });

  And("I update company details", () => {
    companyPage.submitCompanyDetails();
  });
  
  Then("I should see a success message 'Company updated successfully'", () => {
   companyPage.verifyCompanyUpdated("Test company1");
  });

  When("I click the delete button of particular company", () => {
    companyPage.clickCompanyDeleteButton();
    });

   And("I confirm company deletion", () => {
     companyPage.confirmCompanyDeletion();
   });

   Then("I should see a success message 'Company deleted successfully'", () => {
    companyPage.verifyCompanyDeleted();
    });