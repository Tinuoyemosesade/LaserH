import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
import { faker } from '@faker-js/faker';
import Login from "../../support/pages/login";
import Home from "../../support/pages/home";

// get username & password from cypress.config.js rather than hardcode them here.
const username = Cypress.env('username')
const password = Cypress.env('password')
// creating instance of Login class/page
const login = new Login();
const home = new Home(); 

Given("I navigate to {string}", (url) => {
    cy.visit(url)  
})

And("I accept all cookies", () => {
    login.AcceptCookies().click();
})

When('I enter a {string} username', (val) => {
    cy.wait(2000)
    login.Email().should('be.visible').then(() => {
    if(val === 'valid') {
        login.Email().clear({force:true}).type(username, { force: true })
    } else {
        login.Email().clear({force: true}).type(faker.internet.email(), { force: true })
    }
});
})

When('I enter a {string} password', (val) => {
    cy.wait(2000)
    if(val === 'valid') {
        login.Password().type(password, { force: true })
    } else {
        // use an invalid email
        login.Password().type(faker.internet.password(), { force: true })
    }
})

And('I click the {string} button', (val) => {
    login.Button().contains(val).click({ force: true }); // click the button that contains the text we passed in
})

Then('I am brought to the home page', () => {

    cy.intercept('GET', '/api/users/me').as('getMyUser')
    cy.wait('@getMyUser').its('response.statusCode').should('eq', 200) // this shows one way we can assert on the status code

    // here, we use `cy.get()` as we've already waited for the request above, & it won't be called again.
    // we can check as much of the response/request as we want to here. Here are some examples:
    cy.get('@getMyUser').then(xhr => {
        expect(xhr.response.statusCode).to.eq(200)
        expect(xhr.response.body.email).to.eq(username)
        expect(xhr.response.body.firstName).to.eq('test')
        expect(xhr.response.body.lastName).to.eq('Testy')
    })

    // you can add more UI validations here if you like
    home.CustomerServiceButton().should('be.visible') // verify we're on homepage as Support button appears
})

Then('user not found error message is displayed', () => {
    home.Title().contains('ERROR') // checks the 'STRONG' text alone.

    // get the text within the error message box, & verify it:
    home.Alert().should(elem => {
        expect(elem.text().trim()).to.equal('ERROR  User with this e-mail was not found, please register.')
    })
})