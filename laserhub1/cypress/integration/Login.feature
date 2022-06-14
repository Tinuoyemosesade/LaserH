Feature: #1 Login

        Background: User navigates to the login page
            Given I navigate to "https://app.laserhub.com/login"
              And I accept all cookies

        Scenario: #1 User can log in with valid credentials
             When I enter a 'valid' username
              And I enter a 'valid' password
              And I click the 'Login' button
             Then I am brought to the home page

        Scenario: #2 User not found error appears when logging in invalid credentials
             When I enter a 'invalid' username
              And I enter a 'invalid' password
              And I click the 'Login' button
             Then user not found error message is displayed