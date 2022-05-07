const {faker} = require("@faker-js/faker");
const {clearLine} = require("readline");

describe("Registration", () => {
  it("register successfully", () => {
    cy.createRandomUser().then((user) => {
      cy.register(user);
    });
  });
});

describe("Registration unsuccessfull", () => {
  const properties = [
    ["username", "User name is required"],
    ["firstName", "First name is required"],
    ["lastName", "Last name is required"],
    ["email", "Email is required"],
    ["password", "Password is required"],
  ];

  properties.forEach(($type) => {
    const [selector, returnMessage] = $type;

    it(`register without ${selector}`, () => {
      cy.createRandomUser().then((user) => {
        user[selector] = null;
        cy.register(user);
        cy.contains("div[class='error-hint']", returnMessage);
      });
    });
  });

  it("register with nothing typed", () => {
    cy.visit("/");
    cy.contains("button", "Log in").click();
    cy.contains("a", "Sign up").click();
    cy.contains("button", "Sign up").click();
    cy.contains("div[class='error-hint']", "User name is required");
    cy.contains("div[class='error-hint']", "First name is required");
    cy.contains("div[class='error-hint']", "Last name is required");
    cy.contains("div[class='error-hint']", "Email is required");
    cy.contains("div[class='error-hint']", "Password is required");
    cy.contains("div[class='error-hint']", "Password confirmation is required");
  });

  it("register with too short password", () => {
    cy.visit("/");
    cy.contains("button", "Log in").click();
    cy.contains("a", "Sign up").click();
    cy.contains("button", "Sign up").click();
    cy.get("input[name='password1']").type("pas");
    cy.contains("div[class='error-hint']", "Password must be at least 6 characters ");
  });

  it("register with invalid password confirmation", () => {
    cy.visit("/");
    cy.contains("button", "Log in").click();
    cy.contains("a", "Sign up").click();
    cy.contains("button", "Sign up").click();
    cy.get("input[name='password1']").type("password");
    cy.get("input[name='password2']").type("pas2");
    cy.contains("div[class='error-hint']", "Password are not matching");
  });

  it("register with occupied email", () => {
    cy.createRandomUser().then((user) => {
      cy.register(user);
      cy.register(user);
      cy.contains("div[class='error-hint']", "Email `" + user.email + "` is already taken");
    });
  });

  it("register with occupied username", () => {
    cy.createRandomUser().then((user) => {
      cy.register(user);
      cy.visit("/");
      cy.contains("button", "Log in").click();
      cy.contains("a", "Sign up").click();
      cy.get("input[name='userName']").type(user.username);
      cy.get("input[name='firstName']").type(user.firstName);
      cy.get("input[name='lastName']").type(user.lastName);

      cy.generateRandomID().then((randomID) => {
        cy.get("input[name='email']").type(user.email + randomID);
        cy.get("input[name='password1']").type(user.password);
        cy.get("input[name='password2']").type(user.password);
        cy.contains("button", "Sign up").click();
        cy.contains("div[class='error-hint']", "Username `" + user.username + "` is already taken");
      });
    });
  });
});

describe("Login", () => {
  it("login successfully", () => {
    cy.createRandomUser().then((user) => {
      cy.register(user);
      cy.login(user);
    });
  });
});
