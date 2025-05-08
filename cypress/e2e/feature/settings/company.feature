@Company
Feature: Companies
  Background:
      Given I am on the Companies page  

  Scenario: I should be able to add a new company successfully
       When I click the Add button on Companies page
        And I enter valid company details
        And I click the Save button on add company modal
       Then I should see a success message 'Company added successfully'
        And The new company should appear in the company list

  Scenario: I should not be able to add a new company with missing fields
       When I click the Add button on Companies page
        And I leave required fields empty on add company modal
        And I click the Save button on add company modal
       Then I should see validation messages for missing fields on modal

  Scenario: I should not be able to add a new company with duplicate company code
       When I click the Add button on Companies page
        And I enter duplicate company code
       Then I should see validation messages'Code already occupied'

 Scenario: I should be able to edit an existing company successfully
        When I click the edit button of particular company
         And I update the company details
         And I update company details
        Then I should see a success message 'Company updated successfully'

  Scenario: I should be able to delete a company successfully
         When I click the delete button of particular company
          And I confirm company deletion
         Then I should see a success message 'Company deleted successfully'