@CheckDetails
Feature: Check Details Report Generation
  Background:
      Given I am on the check details report page  

  Scenario: Generate button should be disabled by default on check details report page
       Then Generate report button should be disabled on check details report page

  Scenario: Generate button should be enabled after selecting check number on check details report page
       When I select the check number from dropdown on check details report page
       Then Generate report button should be enabled on check details report page

  Scenario: Generate check details report and verify table headers
       When I select the check number from dropdown on check details report page
        And I click the generate report button on check details report page
       Then Report table should be generated on check details report page
        And Check details report table should contain the following headers
          | Insurer |
          | Last Name |
          | First Name |
          | Auth |
          | DOS |
          | Code |
          | Received |
          | Coins |
          | Copay |
          | Refund |
          | Write-off |
          | Deduct |

  Scenario: Export check details report with success message
       When I select the check number from dropdown on check details report page
        And I click the generate report button on check details report page
        And I click the export button on check details report page
       Then Success toast message should be displayed on check details report page
     

  

        