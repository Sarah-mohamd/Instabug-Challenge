//<reference types="cypress" />
const categoriesEndPointPath = "/categories";
const categoryId = "dl3475";
describe("create a category", () => {
  after(() => {
    // delete the created category.
    cy.request({
      method: "DELETE",
      url: categoriesEndPointPath + "/" + categoryId,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Create a category by entering a valid name and id", () => {
    cy.fixture("category/valid_category_creation.json").as(
      "createdCategoryResponse"
    );
    cy.get("@createdCategoryResponse").then(($expectedCategories) => {
      cy.request({
        method: "POST",
        url: categoriesEndPointPath,
        body: { name: "testcategory", id: categoryId },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.name).to.deep.eq($expectedCategories.name);
        expect(response.body.id).to.deep.eq($expectedCategories.id);
      });
    });
  });

  it("Get error message when trying to create a category with existing id", () => {
    cy.fixture("category/invalid_category_creation_response.json").as(
      "inValidCreatedResponse"
    );
    cy.get("@inValidCreatedResponse").then(($expectedCategories) => {
      cy.request({
        method: "POST",
        url: categoriesEndPointPath,
        body: { name: "testcategory", id: "10101010" },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq($expectedCategories.code);
        expect(response.body.name).to.deep.eq($expectedCategories.name);
        expect(response.body.id).to.deep.eq($expectedCategories.id);
        expect(response.body.errors.message).to.deep.eq(
          $expectedCategories.errors.message
        );
      });
    });
  });

  it("Get an error message when trying to create a category without id", () => {
    const categoyName = "lane";
    cy.fixture("category/invalid_category_creation.json").as(
      "createdCategoryResponse"
    );
    cy.get("@createdCategoryResponse").then(($expectedCategories) => {
      cy.request({
        method: "POST",
        url: categoriesEndPointPath,
        body: { name: categoyName },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq($expectedCategories.code);
        expect(response.body.message).to.deep.eq($expectedCategories.message);
      });
    });
  });
});
