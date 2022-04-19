const {faker} = require("@faker-js/faker");

function createRandomUSer() {
    const uniqueFirstName = faker.unique(faker.name.firstName);
    const uniqueLastName = faker.unique(faker.name.lastName);
    const userName = `${uniqueFirstName}_${uniqueLastName}_${generate_randomID()}`.toLowerCase();

    return {
        'userName': userName,
        'firstName': uniqueFirstName,
        'lastName': uniqueLastName,
        'email': `${userName}@gmail.com`,
        'password': `${faker.internet.password()}`
    };
}

function generate_randomID() {
    return faker.datatype.uuid().split('-')[0];
}

Cypress.Commands.add('register', (user) => {
    cy.visit('/');
    cy.contains("button", "Log in").click();
    cy.contains("a", "Sign up").click();
    cy.get("input[name='userName']").type(user.userName);
    cy.get("input[name='firstName']").type(user.firstName);
    cy.get("input[name='lastName']").type(user.lastName);
    cy.get("input[name='email']").type(user.email);
    cy.get("input[name='password1']").type(user.password);
    cy.get("input[name='password2']").type(user.password);
    cy.contains("button", "Sign up").click();
});

Cypress.Commands.add('login', (user) => {
    cy.visit('/');
    cy.contains("button", "Log in").click();
    cy.get("input[name='username']").type(user.userName);
    cy.get("input[name='password']").type(user.password);
    cy.contains("button[class='submit-button']", "Log in").click();
    cy.contains("div[class='logged-user-panel']", user.userName);
});

Cypress.Commands.add('createRandomUSer', createRandomUSer);