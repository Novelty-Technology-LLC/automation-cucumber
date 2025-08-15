@PatientResponsibility
Feature: Patient Responsibility Report Generation
  Background:
      Given I am on the patient responsibility report page  

  Scenario: Generate button should be disabled by default on patient responsibility report page
       Then Generate report button should be disabled
       
  Scenario: Generate button should be enabled after entering any one field on patient responsibility report page
       When I enter the authorization number in authorization number field
       Then Generate report button should be enabled

  Scenario: Generate patient responsibility report and verify table headers
       When I enter the authorization number in authorization number field
        And I enter the deposit date
        And I enter the subscriber ID
        And I click the generate report button
       Then Report table should be generated
        And Patient responsibility report table should contain the following headers
          | Authorization |
          | Subscriber ID |
          | Mem |
          | Last Name |
          | First Name |
          | DOB |
          | DOS |
          | Code |
          | Copay |
          | Coins |
          | Deduct |
          | EXP. Cd. |

  Scenario: Generate report with authorization number only
       When I enter the authorization number in authorization number field
        And I click the generate report button
       Then Report table should be generated
       
  Scenario: Generate report with deposit date only
       When I enter the deposit date
        And I click the generate report button
       Then Report table should be generated
       
  Scenario: Generate report with subscriber ID only
       When I enter the subscriber ID
        And I click the generate report button
       Then Report table should be generated
        
  Scenario: Generate report with authorization number and deposit date
       When I enter the authorization number in authorization number field
        And I enter the deposit date
        And I click the generate report button
       Then Report table should be generated

  Scenario: Generate report with authorization number and subscriber ID
       When I enter the authorization number in authorization number field
        And I enter the subscriber ID
        And I click the generate report button
       Then Report table should be generated
        
  Scenario: Generate report with deposit date and subscriber ID
       When I enter the deposit date
        And I enter the subscriber ID
        And I click the generate report button
       Then Report table should be generated
      
  Scenario: Verify report generation with invalid authorization number
       When I enter an invalid authorization number in authorization number field
        And I click the generate report button
       Then Report table should be generated
        And Table should display "No Result Found"

  Scenario: Verify report generation with invalid deposit date
       When I enter an invalid deposit date
        And I click the generate report button
       Then Report table should be generated
        And Table should display "No Result Found"

    Scenario: Verify report generation with invalid subscriber ID
       When I enter an invalid subscriber ID
        And I click the generate report button
       Then Report table should be generated
        And Table should display "No Result Found"

  Scenario: Export patient responsibility report with success message
       When I enter the authorization number in authorization number field
        And I enter the deposit date
        And I enter the subscriber ID
        And I click the generate report button
        And I click the export button
       Then Success toast message should be displayed
        

     



 