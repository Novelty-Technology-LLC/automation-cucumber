@MissingExplanation
Feature: Missing Explanation Report Generation
  Background:
      Given I am on the missing explanation report page  

  Scenario: Generate button should be disabled by default on missing explanation report page
       Then Generate report button should be disabled
        And Check number dropdown should be empty

  Scenario: Generate button should be enabled after selecting check number on missing explanation report page
       When I select the check number from dropdown
       Then Generate report button should be enabled

  Scenario: Generate missing explanation report and verify table headers
       When I select the check number from dropdown
        And I click the generate report button
       Then Report table should be generated
        And Missing explanation report table should contain the following headers
          | Invoice ID |
          | Invoice Item |
          | Auth No |
          | Sub Id |
          | Mem |
          | Last Name |
          | first Name |
          | DOS |
          | Code |

  Scenario: Export missing explanation report with success message
       When I select the check number from dropdown
        And I click the generate report button
        And I click the export button
       Then Success toast message should be displayed
        

 
