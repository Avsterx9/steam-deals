describe("Basics", () => {
  it("opens main page", () => {
    cy.visit("http://0.0.0.0:8080/");
  });
});

describe("Authentication", () => {
  it("registers an user", () => {
    cy.visit("http://0.0.0.0:8080/");
    cy.contains("button", "Log in").click();
    cy.contains("a", "Sign up").click();
    cy.get("input[name='userName']").type("testaccount");
    cy.get("input[name='firstName']").type("Test");
    cy.get("input[name='lastName']").type("Account");
    cy.get("input[name='email']").type("doesntmatter@mail.com");
    cy.get("input[name='password1']").type("testaccount");
    cy.get("input[name='password2']").type("testaccount");
    cy.contains("button", "Sign up").click();
  });

  it("logs an user in", () => {
    cy.visit("http://0.0.0.0:8080/");
    cy.contains("button", "Log in").click();
    cy.get("input[name='username']").type("testaccount");
    cy.get("input[name='password']").type("testaccount");
    cy.contains("button[class='submit-button']", "Log in").click();
    cy.contains("div[class='logged-user-panel']", "testaccount");
  });
});
