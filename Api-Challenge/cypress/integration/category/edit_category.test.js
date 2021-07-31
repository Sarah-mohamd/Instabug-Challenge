//<reference types="cypress" />
const categoriesEndPointPath = "/categories";
describe("Edit a category", () => {
  const testInput = {
    id: "44444",
  };
  before(() => {
    //create category to be edited.
    cy.request({
      method: "POST",
      url: categoriesEndPointPath,
      body: { name: "testcategory", id: testInput.id },
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  after(() => {
    // delete the created category.
    cy.request({
      method: "DELETE",
      url: categoriesEndPointPath + "/" + testInput.id,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Edit id and name of a category by entering a valid name and id", () => {
    cy.fixture("category/valid_category_update.json").as(
      "updatedCategoryResponse"
    );
    cy.get("@updatedCategoryResponse").then(($expectedCategories) => {
      cy.request({
        method: "PUT",
        url: categoriesEndPointPath + "/" + testInput.id,
        body: { name: "NewCategories", id: "44444" },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.deep.eq($expectedCategories.name);
        expect(response.body.id).to.deep.eq($expectedCategories.id);
      });
    });
  });

  it("Get error message when trying to update a category without entering id", () => {
    cy.fixture("category/invalid_category_update_empty_id.json").as(
      "inValidCreatedResponse"
    );
    cy.get("@inValidCreatedResponse").then(($expectedCategories) => {
      cy.request({
        method: "PUT",
        url: categoriesEndPointPath + "/" + testInput.id,
        body: { name: "NewCategories" },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq($expectedCategories.code);
        expect(response.body.name).to.deep.eq($expectedCategories.name);
        expect(response.body.message).to.deep.eq($expectedCategories.message);
        expect(response.body.errors[0]).to.deep.eq(
          $expectedCategories.errors[0]
        );
      });
    });
  });

  it("Get error message when trying to update a category with invalid id", () => {
    cy.fixture("category/invalid_category_update_empty_id.json").as(
      "inValidCreatedResponse"
    );
    cy.get("@inValidCreatedResponse").then(($expectedCategories) => {
      cy.request({
        method: "PUT",
        url: categoriesEndPointPath + "/" + testInput.id,
        body: { name: "NewCategories", id: "" },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq($expectedCategories.code);
        expect(response.body.name).to.deep.eq($expectedCategories.name);
        expect(response.body.message).to.deep.eq($expectedCategories.message);
        expect(response.body.errors[0]).to.deep.eq(
          $expectedCategories.errors[1]
        );
      });
    });
  });
});
