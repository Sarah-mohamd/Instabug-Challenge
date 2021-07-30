import LoginSelector from "../selectors/auth/login.selectors";

class LoginPage {
  getErrorMessage() {
    return cy.get(LoginSelector.assertionAlertMessage);
  }

  getErrorMessageAlert() {
    return cy.get(LoginSelector.errorMessageAlert);
  }

  fillEmail(email) {
    cy.get(LoginSelector.email).type(email);
  }

  fillPassword(password) {
    cy.get(LoginSelector.password).type(password);
  }

  submitLogin() {
    cy.get(LoginSelector.loginBtn).click();
  }

  getEmailElement() {
    return cy.get(LoginSelector.email);
  }

  getPasswordElement() {
    return cy.get(LoginSelector.password);
  }
  getForgetPasswordElement() {
    return cy.get(LoginSelector.forgetPassword);
  }

  getCreateAccountElement() {
    return cy.get(LoginSelector.createAccount);
  }

  getLoginElement() {
    return cy.get(LoginSelector.loginBtn);
  }

  navigateToForgetPassword() {
    cy.get(LoginSelector.forgetPassword).click();
  }

  navigateToCreateAccount() {
    cy.get(LoginSelector.createAccount).click();
  }
}
export default LoginPage;
