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
    Then The task should be on hold for 1 day
      And I verify the task on hold through the chip on task detail
      And I click on on-hold filter on queue
      And The task should be visible in the on-hold filter

  Scenario: Resume a held task and verify it is resumed
     When I click on the task
      And I click on the ellipses menu
      And I click on resume action
     Then The task should be resumed
      And I verify the task is no longer on hold

  Scenario: Move task to another queue and verify it is moved
    When I click on the task "3452772"
      And I click on the ellipses menu
      And I click on move action
      And I select target queue "Signature"
      And I confirm the move action
    Then The task should be moved to the target queue
      And I verify the task "3452772" is in the target queue

  Scenario: Reassign task back and verify it is reassigned
    When I click on the task "3452772" in "Signature" queue
      And I click on the ellipses menu
      And I click on reassign back action
      And I confirm the reassign back action
    Then The task should be reassigned back to "Commercial" queue
      And I verify the task "3452772" is in the original queue

  Scenario: Assign task to a user and verify it is assigned
    When I click on the task "3452772"
      And I click on the user avatar
      And I select "Deepsana Thapa" from dropdown
    Then The task should be assigned to the user
      And I verify the task is assigned to the user

  Scenario: Unassign task from a user and verify it is unassigned
    When I click on the task "3452772"
    Given A task is assigned to a user
    When I click on the user avatar
      And I select "Unassigned" from dropdown
    Then The user should be unassigned
      And I verify the task is no longer assigned to any user
