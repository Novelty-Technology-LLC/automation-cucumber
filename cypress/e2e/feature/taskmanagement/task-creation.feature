@Task-Creation
Feature: Task Management - SFTP File Upload and Task Creation
  As a user
  I want to upload IB, IBD Excel files and 835 EDI files to SFTP server
  And have the system automatically create tasks for file processing
  So that uploaded files can be tracked and managed

  Scenario: Upload IB, IBD, and EDI files and create task in Commercial queue
    When I upload IB Excel file and IBD Excel file to SFTP server for Commercial queue
      And I upload 835 EDI file to SFTP server for Commercial queue
      And I am logged into the system
      And I am on the AR-module
    Then A task should be created and placed in the Commercial queue 

  Scenario: Upload IB, IBD, and EDI files and create task in Signature queue
    When I upload IB Excel file and IBD Excel file to SFTP server for Signature queue
      And I upload 835 EDI file to SFTP server for Signature queue
      And I am logged into the system
      And I am on the AR-module
    Then A task should be created and placed in the Signature queue

  Scenario: Upload IB, IBD, and EDI files and create task in AHF queue
    When I upload IB Excel file and IBD Excel file to SFTP server for AHF queue
      And I upload 835 EDI file to SFTP server for AHF queue
      And I am logged into the system
      And I am on the AR-module
    Then A task should be created and placed in the AHF queue

  Scenario: Upload IB, IBD, and EDI files and create task in Medicare queue
    When I upload IB Excel file and IBD Excel file to SFTP server for Medicare queue
      And I upload 835 EDI file to SFTP server for Medicare queue
      And I am logged into the system
      And I am on the AR-module
    Then A task should be created and placed in the Medicare queue

  Scenario: Upload IB, IBD, and EDI files and create task in Medical queue
    When I upload IB Excel file and IBD Excel file to SFTP server for Medical queue
      And I upload 835 EDI file to SFTP server for Medical queue
      And I am logged into the system
      And I am on the AR-module
    Then A task should be created and placed in the Medical queue 