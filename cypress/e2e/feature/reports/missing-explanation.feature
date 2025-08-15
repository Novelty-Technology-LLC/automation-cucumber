@MissingExplanation
Feature: Missing PR Explanation Report Generation
  Background:
      Given I am on the missing PR explanation report page  

  Scenario: Generate button should be disabled by default on missing PR explanation report page
       Then Generate report button should be disabled on missing PR explanation report page
        
  Scenario: Generate button should be enabled after selecting check number on missing PR explanation report page
       When I select the check number from dropdown on missing PR explanation report page
       Then Generate report button should be enabled on missing PR explanation report page

  Scenario: Generate missing PR explanation report and verify table headers
       When I select the check number from dropdown on missing PR explanation report page
        And I click the generate report button on missing PR explanation report page
       Then Report table should be generated on missing PR explanation report page
        And Missing PR explanation report table should contain the following headers
          | Invoice ID |
          | Invoice Item |
          | Auth No |
          | Sub Id |
          | Mem |
          | Last Name |
          | first Name |
          | DOS |
          | Code |

  Scenario: Export missing PR explanation report with success message
       When I select the check number from dropdown on missing PR explanation report page
        And I click the generate report button on missing PR explanation report page
        And I click the export button on missing PR explanation report page
       Then Success toast message should be displayed on missing PR explanation report page
        

 
