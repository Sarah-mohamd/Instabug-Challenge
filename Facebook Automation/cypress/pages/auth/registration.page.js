import RegistrationSelector from "../selectors/auth/registration.selector";

class RegistrationPage {
  goToBirthdateStep(user) {
    this.fillFirstName(user.firstName);
    this.fillLastName(user.lastName);
    this.goToNextStep();
  }

  goToEmailStep(user) {
    this.goToBirthdateStep(user);
    this.selectDay(user.birthDay);
    this.selectMonth(user.birthMonth);
    this.selectYear(user.birthYear);
    this.goToNextStep();
  }

  goToGenderStep(user) {
    this.goToEmailStep(user);
    this.switchToEmail();
    this.fillEmail(user.email);
    this.goToNextStep();
  }

  goToPasswordStep(user) {
    this.goToGenderStep(user);
    this.selectFemaleGender();
    this.goToNextStep();
  }

  goToNextStep() {
    cy.get(RegistrationSelector.nextBtn).click();
  }

  tabOnSignup() {
    cy.get(RegistrationSelector.signupBtn).click();
  }

  switchToEmail() {
    cy.get(RegistrationSelector.switchEmailLink).click();
  }

  getEmailErrorMessage() {
    return cy.get(RegistrationSelector.emailErrorMessage);
  }

  getErrorMessage() {
    return cy.get(RegistrationSelector.alertMessageBox);
  }

  getErrorMessageAlert() {
    return cy.get(RegistrationSelector.alertMessage);
  }

  getBirthdateTitle() {
    return cy.get(RegistrationSelector.birthdatePageTitle);
  }

  getEmailTitle() {
    return cy.get(RegistrationSelector.emailPageTitle);
  }

  getGenderTitle() {
    return cy.get(RegistrationSelector.genderPageTitle);
  }

  getPasswordTitle() {
    return cy.get(RegistrationSelector.passwordPageTitle);
  }

  fillFirstName(firstName) {
    cy.get(RegistrationSelector.firstName).type(firstName);
  }

  fillLastName(lastName) {
    cy.get(RegistrationSelector.lastName).type(lastName);
  }

  fillPassword(password) {
    cy.get(RegistrationSelector.password).type(password);
  }

  selectFemaleGender() {
    cy.get(RegistrationSelector.femaleGender).click();
  }

  fillEmail(email) {
    cy.get(RegistrationSelector.email).type(email);
  }

  selectDay(day) {
    cy.get(RegistrationSelector.day).select(day);
  }
  selectMonth(month) {
    cy.get(RegistrationSelector.month).select(month);
  }
  selectYear(year) {
    cy.get(RegistrationSelector.year).select(year);
  }
}
export default RegistrationPage;
