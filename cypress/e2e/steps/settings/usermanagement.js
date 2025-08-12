import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { userPage } from "../../pages/setting/userpage.js";
import { loginPage } from '../../pages/authentication/loginpage.js';

// Background and Navigation
Given("I am on the User Management page", () => {
   loginPage.visit();
   loginPage.loginValidUser();
   userPage.goToUserManagementPage();
});

// Add User Scenarios
When("I click the Add User button", () => {
  userPage.clickAddUserButton();
});

And('I enter valid user details', () => {
  userPage.enterValidUserDetails();
});

And("I click the Save button on add user modal", () => {
  userPage.saveUser();
});

Then("I should see a success message 'User added successfully'", () => {
  userPage.verifyUserAddedSuccessfully();
});

And("The new user should appear in the user list", () => {
  userPage.verifyUserInList("Deepsana");
});

// Validation Scenarios
And('I leave required fields empty while adding user', () => {
  userPage.leaveRequiredFieldsEmpty();
});

Then("I should see validation messages for missing fields on add user modal", () => {
  userPage.verifyValidationMessages();
});

And('I enter an invalid email format', () => {
  userPage.enterInvalidUserDetails();
});

Then("I should see validation message for invalid email format", () => {
  userPage.verifyEmailValidationMessage();
});

Then("I should see error message for existing email address", () => {
  userPage.verifyExistingEmailError();
});

// Permission Management Scenarios
When("I click the manage permissions button of particular user", () => {
  userPage.clickManagePermissions();
});

And("I update the permission to perform the settings task", () => {
  userPage.updateSettingPermission();
});

And("I click the Save button on roles and permissions", () => {
  userPage.savePermissions();
  userPage.logout();
});

Then("I should able to see 'setting' tab", () => {
  userPage.verifySettingTabVisible();
});

Then("I uncheck the setting permission", () => {
  userPage.updateSettingPermission();
});

// Edit User Scenarios
When("I click the edit button of particular user", () => {
  userPage.clickEditUser();
});

And("I update the user details", () => {
  userPage.updateUserDetails();
});

And("I update user details", () => {
  userPage.saveUser();
});

Then("I should see a success message 'User updated successfully'", () => {
  userPage.verifyUserUpdatedSuccessfully();
});

// Delete User Scenarios
When("I click the delete button of particular user", () => {
  userPage.clickDeleteUser();
});

And("I confirm user deletion", () => {
  userPage.confirmUserDeletion();
});

Then("I should see a success message 'User deleted successfully'", () => {
  userPage.verifyUserDeletedSuccessfully();
});

// Search Scenarios
When("I enter 'Deepsana' in the search bar", () => {
  userPage.searchUser('Deepsana');
});

Then("The user table should only display users with names containing 'Deepsana'", () => {
  userPage.verifySearchResults('Deepsana');
});

// Advanced Search Scenarios
When("I click on advance search bar on user page", () => {
  userPage.clickAdvancedSearch();
});

And("I select the role as 'Representative'", () => {
  userPage.selectRole('Representative');
});

And("I click the apply button", () => {
  userPage.applyAdvancedFilter();
});

Then("The user table should only display users with Role containing 'Representative'", () => {
  userPage.verifyRoleFilterResults('Representative');
});

And("I select the status as 'Active'", () => {
  userPage.selectStatus('Active');
});

Then("The user table should only display users with Status containing 'Active'", () => {
  userPage.verifyStatusFilterResults('Active');
});

Then("I click the clear filter button", () => {
  userPage.clearAdvancedFilter();
});
        