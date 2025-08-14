@CheckTotals
Feature: Check Totals Report Generation
  Background:
      Given I am on the check totals report page  

  Scenario: Generate button should be disabled by default on check totals report page
       Then Generate report button should be disabled
        And Check number dropdown should be empty

  Scenario: Generate button should be enabled after selecting check number on check totals report page
       When I select the check number from dropdown
       Then Generate report button should be enabled

  Scenario: Generate check totals report and verify table headers
       When I select the check number from dropdown
        And I click the generate report button
       Then Report table should be generated
        And Check totals report table should contain the following headers
          | Insurer |
          | EFT Trace Number |
          | Total AMT |

  Scenario: Export check totals report with success message
       When I select the check number from dropdown
        And I click the generate report button
        And I click the export button
       Then Success toast message should be displayed
        

 