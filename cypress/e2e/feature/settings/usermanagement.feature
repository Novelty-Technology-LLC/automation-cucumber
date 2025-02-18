Feature: User Management
  Background:
      Given I am on the User Management page  

   Scenario: I should be able to add a new user successfully
       When I click the Add User button
        And I enter valid user details
        And I click the Save button on add user modal
       Then I should see a success message 'User added successfully'
        And The new user should appear in the user list

   Scenario: I should not be able to add a new user with missing fields
       When I click the Add User button
        And I leave required fields empty while adding user
        And I click the Save button on add user modal
       Then I should see validation messages for missing fields on add user modal

    Scenario: I should not be able to add a new user with an invalid email format
         When I click the Add User button
          And I enter an invalid email format 
          And I click the Save button on add user modal
         Then I should see validation message for invalid email format

    Scenario: I should not be able to add a new user with an existing email address
         When I click the Add User button
          And I enter valid user details
          And I click the Save button on add user modal
         Then I should see error message for existing email address
     
     Scenario: I should be able to manage permission for an existing user successfully
         When I click the manage permissions button of particular user
          And I update the permission to perform the settings task
          And I click the Save button on roles and permissions
         Then I should able to see 'setting' tab

     Scenario: I should be able to uncheck the permission for an existing user
          When I click the manage permissions button of particular user
          Then I uncheck the setting permission

    Scenario: I should be able to edit an existing user successfully
        When I click the edit button of particular user
         And I update the user details
         And I update user details
        Then I should see a success message 'User updated successfully'

    Scenario: I should be able to delete a user successfully
         When I click the delete button of particular user
          And I confirm user deletion
         Then I should see a success message 'User deleted successfully'

    Scenario: I should be able to search the user
         When I enter 'Deepsana' in the search bar
         Then The user table should only display users with names containing 'Deepsana'

    Scenario: I should be able to search the user by role
         When I click on advance search bar on user page
          And I select the role as 'Representative'
          And I click the apply button
         Then The user table should only display users with Role containing 'Representative'

     Scenario: I should be able to search the user by status
         When I click on advance search bar on user page
          And I select the status as 'Active'
          And I click the apply button
         Then The user table should only display users with Status containing 'Active'

     Scenario: I should be able to clear the advance search filter
         When I click on advance search bar on user page
          And I select the status as 'Active'
          And I select the role as 'Representative'
         Then I click the clear filter button
         
          

    

   
          