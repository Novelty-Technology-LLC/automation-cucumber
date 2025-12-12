@Exception-Task
Feature: Task Management - Exception Task Creation
  As a user
  I want to upload files that create exception tasks
  And have the system automatically create exception tasks for file processing
  So that exception tasks can be tracked and managed

  Scenario: Upload IB file only and verify missing service line exception, then resolve it
    When I upload IB Excel file only to SFTP server for missing service line exception
      And I am logged into the system
      And I am on the AR-module
    Then The task should be placed in the Missing Billing queue
    When I click on the task for missing service line exception
    Then The task should contain an accordion with missing service line exception details
    When I hover over the missing service line exception accordion
    Then The missing service line exception detail should be visible and contain exception detail text
    When I upload IBD Excel file to SFTP server to resolve missing service line exception
      And I upload 835 EDI file to SFTP server to resolve missing service line exception
      And I wait for the exception to be resolved
    Then The task should be moved to the Commercial queue

  Scenario: Upload IBD file only and verify missing billing info exception, then resolve it
    When I upload IBD Excel file only to SFTP server for missing billing info exception
      And I am logged into the system
      And I am on the AR-module
    Then The task should be placed in the Missing Billing queue
    When I click on the task for missing billing info
    Then The task should contain an accordion with missing billing info exception details
    When I hover over the missing billing info accordion
    Then The missing billing info exception detail should be visible and contain exception detail text
    When I upload IB Excel file to SFTP server to resolve missing billing info exception
      And I upload 835 EDI file to SFTP server to resolve missing billing info exception
      And I wait for the exception to be resolved
    Then The task should be moved to the Commercial queue for missing billing info

