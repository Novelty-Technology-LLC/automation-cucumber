Feature: User Management
  Background:
      Given I am on the User Management page  

   Scenario: I should be able to add a new user successfully
       When I click the Add User button
        And I enter valid user details
        And I click the Save button
       Then I should see a success message 'User added successfully'
        And The new user should appear in the user list

   Scenario: I should not be able to add a new user with missing fields
       When I click the Add User button
        And I leave required fields empty
        And I click the Save button
       Then I should see validation messages for missing fields  

    Scenario: I should not be able to add a new user with an invalid email format
         When I click the Add User button
          And I enter an invalid email format 
          And I click the Save button
         Then I should see validation message

    Scenario: I should not be able to add a new user with an existing email address
         When I click the Add User button
          And I enter valid user details
          And I click the Save button
         Then I should see error message

    Scenario: I should be able to edit an existing user successfully
         When I click the edit button 
         And I update the user details
         And I click the Update button
        Then I should see a success message 'User updated successfully'

    Scenario: I should be able to delete a user successfully
         When I click the delete button 
          And I click the confirm button
         Then I should see a success message 'User deleted successfully'

    
         

    

   
          