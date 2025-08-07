@login
Feature: User Login
  Background:
      Given I visit the login page   

  Scenario: I should be able to log in with valid credentials
      When  I enter valid username and password
      Then  I should be redirected to the dashboard

  Scenario: I should not be able to log in with an invalid credentials
      When I enter an invalid username or password
      Then I should see an error message

  Scenario: I should not be able to log in with an empty fields
      When I leave the username and password fields empty
       And I click the login button
      Then I should see an validation message

