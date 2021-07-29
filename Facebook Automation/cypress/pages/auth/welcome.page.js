import welcomeSelector from "../selectors/auth/welcome.selectors";

class WelcomePage {
  visitLogin() {
    cy.visit("/login.php/?locale=en_GB");
  }
  visitRegister() {
    cy.visit("/r.php/?locale=en_GB");
  }
  visitHome() {
    cy.visit("/");
  }

  navigateToLogin() {
    cy.get(welcomeSelector.loginBtn).click();
  }
  navigateToCreateAccount() {
    cy.get(welcomeSelector.joinBtn).click();
  }
}
export default WelcomePage;
