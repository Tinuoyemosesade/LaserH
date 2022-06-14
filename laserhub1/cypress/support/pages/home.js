class Home {
    CustomerServiceButton () {
        return cy.get('.service-button')
    }

    Email () {
        return cy.get('#email')
    }

    Password () {
        return cy.get('#password')
    }

    Button() {
        return cy.get('.btn')
    }

    Title() {
        return cy.get('strong')
    }

    Alert() {
        return cy.get('.alert')
    }
}

export default Home;