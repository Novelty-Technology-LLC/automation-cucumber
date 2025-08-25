Feature: Task Management - SFTP File Upload and Task Creation
  As a user
  I want to upload IB, IBD Excel files and 835 EDI files to SFTP server
  And have the system automatically create tasks for file processing
  So that uploaded files can be tracked and managed

  Scenario: Upload IB, IBD, and EDI files and create tasks
    When I upload IB Excel file and IBD Excel file to SFTP server
    And I upload 835 EDI file to SFTP server
    And I am logged into the system
    And I am on the AR-module
    Then A task should be created and placed in commerical queue 

