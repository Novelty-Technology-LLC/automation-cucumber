Feature: Queue Management
  Background:
      Given I am on the Queue Management page  

   Scenario: I should be able to add a new queue successfully
       When I click the Add Queue button
        And I enter valid queue details
        And I click the Save button on add queue modal
       Then I should see a success message 'Queue added successfully'
        And The new queue should appear in the queue list

    Scenario: I should be able to assign representative 
         When I click the Assign Representative button
          And I enter the representative name
          And I click the Save button on modal
         Then I should see assigned reps

    Scenario: I should be able to unassign representative 
         When I click the Assign Representative button
          And I click the cross icon of assigned representative
          And I click the Save button on modal

   Scenario: I should not be able to add a new user with missing fields
       When I click the Add Queue button
        And I leave required fields empty
        And I click the Save button on add queue modal
       Then I should see validation messages for missing fields

   Scenario: I should not be able to add a new queue with duplicate queue name
        When I click the Add Queue button
         And I enter duplicate queue name
         And I click the Save button on add queue modal
        Then I should see error message for duplicate queue

   Scenario: I should not be able to edit queue with duplicate queue name
        When I click the Edit button of particular queue
         And I edit with duplicate queue name
         And I update queue details
        Then I should see error message while editing the queue
    
    Scenario: I should be able to a delete empty queue
         When I verify that the queue does not contain any tasks
          And I click the Delete button of particular queue
          And I confirm queue deletion
         Then I should see a success message 'Queue deleted successfully'

    Scenario: I should not be able to delete queue with task
         When I verify that the queue contains a task
          And I click the Delete button of particular queue
          And I confirm queue deletion
         Then I should see error message for queue with task

    
         