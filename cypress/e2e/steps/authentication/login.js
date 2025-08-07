import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { loginPage } from '../../pages/authentication/loginpage.js';

 Given("I visit the login page", () => {
    loginPage.visit();
  });

 When("I enter valid username and password", () => {
    loginPage.loginValidUser();
  });
  
 Then("I should be redirected to the dashboard", () => {
    loginPage.verifyDashboardUrl();
  });

  When("I enter an invalid username or password", () => {
    loginPage.loginInvalidUser();
  });

  Then("I should see an error message", () => {
    loginPage.verifyLoginError();
  });

  When("I leave the username and password fields empty", () => {
      loginPage.loginWithEmptyFields();
  });

  And('I click the login button', () => {
    loginPage.clickLoginButton();
  });

  Then("I should see an validation message", () => {
    loginPage.verifyValidationMessage();
  });

