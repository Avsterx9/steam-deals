const {faker} = require("@faker-js/faker");

describe('Registration', () => {

    it('register successfully', () => {
        cy.createRandomUSer().then(user => {
            cy.register(user);
        });
    })
})

describe('Login', () => {

    it('login successfully', () => {
        cy.createRandomUSer().then(user => {
            cy.register(user);
            cy.login(user);
        });
    })
})