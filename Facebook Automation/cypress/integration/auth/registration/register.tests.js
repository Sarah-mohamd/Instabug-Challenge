/**********************************************************************************************************************
 * This file contains testcases to test registration functionality, that documented in login_tests.DM file
 ***********************************************************************************************************************/

import TestData from "../../../fixtures/auth/registration.data.json";
import Assertion from "../../../utilities/assertion";
import LoginPage from "../../..//pages/auth/login.page";
import ProfilePage from "../../../pages/auth/profile.page";
import HomePage from "../../../pages/auth/home.page";
import WelcomePage from "../../../pages/auth/welcome.page";
import RegistrationPage from "../../../pages/auth/registration.page";

let assert = new Assertion();
let loginPage = new LoginPage();
let profilePage = new ProfilePage();
let homePage = new HomePage();
let welcomePage = new WelcomePage();
let registrationPage = new RegistrationPage();

describe("Register Functionality Tests", () => {
  describe("Success registration functionality Tests", () => {
    beforeEach(() => {
      welcomePage.visitRegister();
      cy.clearCookies();
    });

    it("User can creat an account then go to the home page", () => {
      registrationPage.fillFirstName(TestData.userData.firstName);
      registrationPage.fillLastName(TestData.userData.lastName);
      registrationPage.goToNextStep();
      registrationPage.getBirthdateTitle().then(($title) => {
        expect(TestData.expectedData.birthDate.title).to.eq($title.text());
      });
      registrationPage.selectDay(TestData.userData.birthDay);
      registrationPage.selectMonth(TestData.userData.birthMonth);
      registrationPage.selectYear(TestData.userData.birthYear);
      registrationPage.goToNextStep();
      registrationPage.getEmailTitle().then(($title) => {
        expect(TestData.expectedData.phone.title).to.eq($title.text());
      });
      registrationPage.switchToEmail();
      registrationPage.fillEmail(TestData.userData.email);
      registrationPage.goToNextStep();
      registrationPage.getGenderTitle().then(($title) => {
        expect(TestData.expectedData.gender.title).to.eq($title.text());
      });
      registrationPage.selectFemaleGender();
      registrationPage.goToNextStep();
      registrationPage.fillPassword(TestData.userData.password);
      registrationPage.tabOnSignup();
      assert.isUrlContains("home.php");
      cy.clearCookies();
      welcomePage.visitLogin();
      welcomePage.navigateToLogin();
      loginPage.fillEmail(TestData.userData.email);
      loginPage.fillPassword(TestData.userData.password);
      loginPage.submitLogin();
      assert.isUrlContains("home.php");
      homePage.visitProfile();
      profilePage.getUserName().then(($userName) => {
        expect(TestData.userData.fullName).to.eq($userName.text());
      });
    });
  });

  describe("Registration failure tests", () => {
    beforeEach(() => {
      welcomePage.visitRegister();
      cy.clearCookies();
    });

    it("Check that validation error appears when submit with empty firstname and empty lastname", () => {
      registrationPage.goToNextStep();
      assert.isElementVisible(registrationPage.getErrorMessage());
      registrationPage.getErrorMessageAlert().then(($message) => {
        expect(TestData.expectedData.messages.popUpMessageError).to.eq(
          $message.text()
        );
      });
    });

    it("Check that validation error appears when submit with empty firstname field", () => {
      registrationPage.fillLastName(TestData.userData.lastName);
      registrationPage.goToNextStep();
      assert.isElementVisible(registrationPage.getErrorMessage());
      registrationPage.getErrorMessageAlert().then(($message) => {
        expect(TestData.expectedData.messages.firstNameMessageError).to.eq(
          $message.text()
        );
      });
    });

    it("Check that validation error appears when submit with empty lastname field", () => {
      registrationPage.fillFirstName(TestData.userData.firstName);
      registrationPage.goToNextStep();
      assert.isElementVisible(registrationPage.getErrorMessage());
      registrationPage.getErrorMessageAlert().then(($message) => {
        expect(TestData.expectedData.messages.familyNameMessageError).to.eq(
          $message.text()
        );
      });
    });

    it("Check that validation error appears when entering invalid birthdate", () => {
      registrationPage.goToBirthdateStep(TestData.userData);
      registrationPage.goToNextStep();
      registrationPage.getErrorMessageAlert().then(($message) => {
        expect(TestData.expectedData.messages.notValidBirthDate).to.eq(
          $message.text()
        );
      });
    });

    it("Check that validation error appears when submit with empty email", () => {
      registrationPage.goToEmailStep(TestData.userData);
      registrationPage.switchToEmail();
      registrationPage.goToNextStep();
      registrationPage.getErrorMessageAlert().then(($message) => {
        expect($message.text()).to.contain(
          TestData.expectedData.messages.emptyEmail
        );
      });
    });

    it("Check that validation error appears when entering invalid email", () => {
      registrationPage.goToEmailStep(TestData.userData);
      registrationPage.switchToEmail();
      registrationPage.fillEmail(TestData.userData.invalidEmail);
      registrationPage.goToNextStep();
      registrationPage.selectFemaleGender();
      registrationPage.goToNextStep();
      registrationPage.fillPassword(TestData.userData.password);
      registrationPage.tabOnSignup();
      registrationPage.getEmailTitle().then(($title) => {
        expect(TestData.expectedData.email.title).to.eq($title.text());
      });
      registrationPage.getEmailErrorMessage().then(($message) => {
        expect($message.text()).to.contain(
          TestData.expectedData.messages.invalidEmail
        );
      });
    });

    it("Check that validation error appears when register with an email already exist", () => {
      registrationPage.goToEmailStep(TestData.userData);
      registrationPage.switchToEmail();
      registrationPage.fillEmail(TestData.userData.existEmail);
      registrationPage.goToNextStep();
      registrationPage.selectFemaleGender();
      registrationPage.goToNextStep();
      registrationPage.fillPassword(TestData.userData.password);
      registrationPage.tabOnSignup();
      assert.isUrlContains(TestData.expectedData.url.emailExistRecoveryAccount);
    });

    it("Check that validation error appears when submit without selecting a gender", () => {
      registrationPage.goToGenderStep(TestData.userData);
      registrationPage.goToNextStep();
      registrationPage.getErrorMessageAlert().then(($message) => {
        expect(TestData.expectedData.messages.unselectedGender).to.eq(
          $message.text()
        );
      });
    });

    it("Check that validation error appears when submit with invalid password format", () => {
      registrationPage.goToPasswordStep(TestData.userData);
      registrationPage.tabOnSignup();
      registrationPage.getErrorMessageAlert().then(($message) => {
        expect(TestData.expectedData.messages.emptyPassword).to.eq(
          $message.text()
        );
      });
    });
  });
});
