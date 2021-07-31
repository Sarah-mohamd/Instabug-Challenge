//<reference types="cypress" />
const categoriesEndPointPath = "/categories";
describe("Retrieve Categories tests", () => {
  it("Retrieve all categories paginated", () => {
    const testInput = {
      limitQueryParm: {
        $limit: 2,
      },
    };
    cy.fixture("category/retrieve_categories.json").as("categoryResponse");
    cy.get("@categoryResponse").then(($expectedCategories) => {
      cy.request({
        url: categoriesEndPointPath,
        qs: testInput.limitQueryParm,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.deep.eq($expectedCategories.data);
        expect(response.body.limit).to.eq($expectedCategories.limit);
      });
    });
  });

  it("Retrieve category by using a specific Filters (name)", () => {
    const testInput = {
      filterByNameQueryParm: {
        "name[]": "Gift Ideas",
      },
    };
    cy.fixture("category/retrieve_categories_by_name.json").as(
      "filteredCategoryResponse"
    );
    cy.get("@filteredCategoryResponse").then(($expectedCategories) => {
      cy.request({
        url: categoriesEndPointPath,
        qs: testInput.filterByNameQueryParm,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data[0].name).to.deep.eq(
          $expectedCategories.data[0].name
        );
        expect(response.body.total).to.eq($expectedCategories.total);
        expect(response.body.limit).to.eq($expectedCategories.limit);
      });
    });
  });

  it("Retrieve a specific category by id", () => {
    const testInput = {
      categoryID: "abcat0010000",
    };
    cy.fixture("category/retrieve_category_by_id.json").as(
      "filteredCategoryResponse"
    );
    cy.get("@filteredCategoryResponse").then(($expectedCategories) => {
      const categoryEndPoint =
        categoriesEndPointPath + "/" + testInput.categoryID;
      cy.request(categoryEndPoint).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.deep.eq($expectedCategories.id);
      });
    });
  });

  it("Check empty response by entering an not found category name", () => {
    const testInput = {
      filterByNameQueryParm: {
        "name[]": "xyx",
      },
    };
    cy.fixture("category/retrieve_categories_by_wrong_name.json").as(
      "filteredCategoryResponse"
    );
    cy.get("@filteredCategoryResponse").then(($expectedCategories) => {
      cy.request({
        url: categoriesEndPointPath,
        qs: testInput.filterByNameQueryParm,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.deep.eq($expectedCategories.data);
        expect(response.body.total).to.eq($expectedCategories.total);
        expect(response.body.limit).to.eq($expectedCategories.limit);
      });
    });
  });

  it("Check empty response by entering an empty name", () => {
    const testInput = {
      filterByName: {
        "name[]": "",
      },
    };
    cy.fixture("category/retrieve_categories_by_wrong_name.json").as(
      "filteredCategoryResponse"
    );
    cy.get("@filteredCategoryResponse").then(($expectedCategories) => {
      cy.request({
        url: categoriesEndPointPath,
        qs: testInput.filterByName,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.deep.eq($expectedCategories.data);
        expect(response.body.total).to.eq($expectedCategories.total);
        expect(response.body.limit).to.eq($expectedCategories.limit);
      });
    });
  });

  it("Get NotFound error when tries to get a category by invalid id", () => {
    const testInput = {
      invalidCategoryID: "ax00000",
    };
    cy.fixture("category/invalid_category_id.json").as(
      "filteredCategoryResponse"
    );
    cy.get("@filteredCategoryResponse").then(($expectedCategories) => {
      const categoryEndPoint =
        categoriesEndPointPath + "/" + testInput.invalidCategoryID;
      cy.request({ url: categoryEndPoint, failOnStatusCode: false }).then(
        (response) => {
          expect(response.status).to.eq(404);
          expect(response.body.name).to.deep.eq($expectedCategories.name);
          expect(response.body.message).to.deep.eq($expectedCategories.message);
        }
      );
    });
  });
});
