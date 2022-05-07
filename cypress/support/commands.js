const {faker} = require("@faker-js/faker");

function createRandomUser() {
  const uniqueFirstName = faker.unique(faker.name.firstName);
  const uniqueLastName = faker.unique(faker.name.lastName);
  const username = `${uniqueFirstName}_${uniqueLastName}_${generate_randomID()}`.toLowerCase();

  return {
    username: username,
    firstName: uniqueFirstName,
    lastName: uniqueLastName,
    email: `${username}@gmail.com`,
    password: `${faker.internet.password()}`,
  };
}

function generate_randomID() {
  return faker.datatype.uuid().split("-")[0];
}

Cypress.Commands.add("register", (user) => {
  cy.visit("/");
  cy.contains("button", "Log in").click();
  cy.contains("a", "Sign up").click();
  cy.get("input[name='userName']").type(user.username);
  cy.get("input[name='firstName']").type(user.firstName);
  cy.get("input[name='lastName']").type(user.lastName);
  cy.get("input[name='email']").type(user.email);
  cy.get("input[name='password1']").type(user.password);
  cy.get("input[name='password2']").type(user.password);
  cy.contains("button", "Sign up").click();
});

Cypress.Commands.add("login", (user) => {
  cy.visit("/");
  cy.contains("button", "Log in").click();
  cy.get("input[name='username']").type(user.username);
  cy.get("input[name='password']").type(user.password);
  cy.contains("button[class='submit-button']", "Log in").click();
  cy.contains("div[class='logged-user-panel']", user.username);
});

Cypress.Commands.add("createRandomUser", createRandomUser);

Cypress.Commands.add("generateRandomID", generate_randomID);

Cypress.Commands.overwrite("type", (originalFn, subject, str, options) => {
  if (str !== "" && str !== null) {
    return originalFn(subject, str, options);
  }

  return subject;
});
