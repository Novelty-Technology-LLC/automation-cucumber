@Task-Action
Feature: Task Management - Task Actions
  As a user
  I want to perform various actions on tasks
  And verify that actions are applied correctly
  So that tasks can be managed effectively

  Background:
      And I am logged into the system
      And I am on the AR-module

  Scenario: I loaded files in SFTP server
    When Files are loaded in SFTP server

  Scenario: Hold task for 1 day and verify it is on hold
    When I click on the task
      And I click on the ellipses menu
      And I click on hold action
      And I hold the task for 1 day
      And I enter notes for holding the task
    Then The task should be on hold for 1 day
      And I verify the task on hold through the chip on task detail
      And I click on on-hold filter on queue
      And The task should be visible in the on-hold filter

  Scenario: Resume a held task and verify it is resumed
     When I click on the task
      And I click on the ellipses menu
      And I click on resume action
      And I enter notes for resuming the task
     Then The task should be resumed
      And I verify the task is no longer on hold

  Scenario: Move task to another queue and verify it is moved
    When I click on the task "3452772"
      And I click on the ellipses menu
      And I click on move action
      And I select target queue "Signature"
      And I enter notes for moving the task
      And I confirm the move action
    Then The task should be moved to the target queue
      And I verify the task "3452772" is in the target queue

  Scenario: Reassign task back and verify it is reassigned
    When I click on the task "3452772" in "Signature" queue
      And I click on the ellipses menu
      And I click on reassign back action
      And I enter notes for reassigning back the task
      And I confirm the reassign back action
    Then The task should be reassigned back to "Commercial" queue
      And I verify the task "3452772" is in the original queue

  Scenario: Assign user to the task and verify it is assigned
    When I click on the task "3452772"
      And I click on the user avatar
      And I select "Deepsana Thapa" from dropdown
      And I enter notes for assigning the user
    Then The task should be assigned to the user

  Scenario: Unassign user from the task and verify it is unassigned
    When I click on the task "3452772"
      And  I click on the assigned user avatar
      And I select "Unassigned" from dropdown
      And I enter notes for unassigning the user
    Then The user should be unassigned
