class Login {
    AcceptCookies () {
        return cy.get('#onetrust-accept-btn-handler')
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
}

export default Login;