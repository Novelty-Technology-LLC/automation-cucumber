Feature: User Login
  Background:
      Given I visit the login page   

  Scenario: Successful login with valid credentials
      When  I enter valid username and password
      Then  I should be redirected to the dashboard

  Scenario: Login with invalid credentials
      When I enter an invalid username or password
      Then I should see an error message

  Scenario: Login with empty fields
      When I leave the username and password fields empty
       And I click the login button
      Then I should see an error message

