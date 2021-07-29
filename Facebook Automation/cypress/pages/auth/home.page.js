class HomePage {
  visitProfile() {
    cy.visit("/profile/?locale=en_GB");
  }
}
export default HomePage;
