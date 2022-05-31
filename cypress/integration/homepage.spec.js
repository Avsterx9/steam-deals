describe("Display games", () => {
  it("display top games", () => {
    cy.visit("/");
    cy.get("button[class='cookie-btn']").contains("Accept").click();
    cy.get("div[class='game-box']").should("be.visible");
  });

  it("display random games", () => {
    cy.visit("/");
    cy.get("button[class='cookie-btn']").contains("Accept").click();
    cy.get('input[type="checkbox"]').eq(1).check({force: true});
    cy.get("div[class='game-box']").should("be.visible");
  });
});

describe("get game details", () => {
  it("get top game details", () => {
    cy.visit("/");
    cy.get("button[class='cookie-btn']").contains("Accept").click();
    cy.get("div[class='go-to-details-btn']").contains("Details").click();
    cy.get("img").should("be.visible");
  });
});

describe("Search for game", () => {
  it("search for game successfully", () => {
    cy.visit("/");
    cy.get("button[class='cookie-btn']").contains("Accept").click();
    cy.get("input[type='text']").type("counter strike");
    cy.wait(3000);
    cy.get("div[class='search-result']").contains("Counter-Strike: Global Offensive").click();
    cy.get("div[class='table-div']").contains("Counter-Strike: Global Offensive").should("be.visible");
  });
});

describe("get game details with steam redirect", () => {
  it("go to steam game page", () => {
    cy.visit("/");
    cy.get("button[class='cookie-btn']").contains("Accept").click();
    cy.get("div[class='go-to-details-btn']").contains("Details").click();
    cy.get("div[class='price-div']").find("img").should("be.visible").click();
  });
});
