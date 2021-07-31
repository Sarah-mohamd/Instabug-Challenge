//<reference types="cypress" />
const categoriesEndPointPath = "/categories/";
const testInput = {
  categoryId: "dl3473",
};
describe("Delete category tests", () => {
  before(() => {
    //create category to be deleted.
    cy.request({
      method: "POST",
      url: categoriesEndPointPath,
      body: { name: "testcategory", id: testInput.categoryId },
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it("Delete a category by entering a valid id", () => {
    cy.fixture("category/delete_category_by_id.json").as("categoryResponse");
    cy.get("@categoryResponse").then(($expectedCategories) => {
      cy.request({
        method: "DELETE",
        url: categoriesEndPointPath + testInput.categoryId,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.deep.eq($expectedCategories.name);
        expect(response.body.id).to.deep.eq($expectedCategories.id);
      });
    });
  });

  it("Get an Error message when tries to delete a category that already deleted before", () => {
    cy.fixture("category/invalid_category_deletion.json").as(
      "categoryResponse"
    );
    cy.get("@categoryResponse").then(($expectedCategories) => {
      cy.request({
        method: "DELETE",
        url: categoriesEndPointPath + testInput.categoryId,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq($expectedCategories.code);
        expect(response.body.name).to.deep.eq($expectedCategories.name);
        expect(response.body.id).to.deep.eq($expectedCategories.id);
      });
    });
  });
});
