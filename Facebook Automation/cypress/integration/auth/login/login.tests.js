/**********************************************************************************************************************
 * This file contains testcases to test login functionality, that documented in login_tests.DM file
 ***********************************************************************************************************************/
// <reference types="cypress" />

import Assertion from "../../../utilities/assertion";
import LoginPage from "../../..//pages/auth/login.page";
import ProfilePage from "../../../pages/auth/profile.page";
import HomePage from "../../../pages/auth/home.page";
import WelcomePage from "../../../pages/auth/welcome.page";

/// Pages objects
let loginPage = new LoginPage();
let profilePage = new ProfilePage();
let homePage = new HomePage();
let welcomePage = new WelcomePage();

let assert = new Assertion();
var loginTestdata = null;

describe("Login Page Tests", () => {
  before(() => {
    cy.fixture("auth/login.data.json").as("LoginTestData");
    cy.get("@LoginTestData").then(($data) => {
      loginTestdata = $data;
    });
  });

  describe("Login Page GUI Tests", () => {
    beforeEach(() => {
      welcomePage.visitLogin();
      welcomePage.navigateToLogin();
    });

    it("Check that page elements are displayed successfully", () => {
      assert.isElementVisible(loginPage.getEmailElement());
      assert.isElementVisible(loginPage.getPasswordElement());
      assert.isElementVisible(loginPage.getLoginElement());
      assert.isElementVisible(loginPage.getForgetPasswordElement());
      assert.isElementVisible(loginPage.getCreateAccountElement());
    });

    it("Check that forget Password button redirection worked successfully", () => {
      loginPage.navigateToForgetPassword();
      assert.isUrlContains(loginTestdata.expectedData.forgetPasswordUrlPath);
    });

    it("Check that create account button redirection worked successfully", () => {
      loginPage.navigateToCreateAccount();
      assert.isUrlContains(loginTestdata.expectedData.createAcountUrlPath);
    });
  });

  describe("Login Functionality Tests", () => {
    beforeEach(() => {
      welcomePage.visitLogin();
      welcomePage.navigateToLogin();
    });

    it("User can login by vaild cardinals", () => {
      loginPage.fillEmail(loginTestdata.validUser.email);
      loginPage.fillPassword(loginTestdata.validUser.password);
      loginPage.submitLogin();
      assert.isUrlContains(loginTestdata.expectedData.homeUrlPath);
      homePage.visitProfile();
      profilePage.getUserName().then(($userName) => {
        expect(loginTestdata.validUser.userName).to.eq($userName.text());
      });
    });

    it(" User should not be allowed to Login with unregistered user", () => {
      loginPage.fillEmail(loginTestdata.unregisteredUser.email);
      loginPage.fillPassword(loginTestdata.unregisteredUser.password);
      loginPage.submitLogin();
      assert.isElementVisible(loginPage.getErrorMessageAlert());
      loginPage.getErrorMessage().then(($message) => {
        expect($message).not.to.be.empty;
      });
    });

    it("User should not be allowed to Login with Invalid or Empty data", () => {
      loginPage.fillEmail(loginTestdata.invalidUser.invalidEmailFormat);
      loginPage.fillPassword(loginTestdata.invalidUser.invalidPassword);
      loginPage.submitLogin();
      assert.isElementVisible(loginPage.getErrorMessageAlert());
    });

    it("User should not be allowed to Login with Invalid or Empty data", () => {
      loginPage.fillEmail(" ");
      loginPage.fillPassword(" ");
      loginPage.submitLogin();
      assert.isElementVisible(loginPage.getErrorMessageAlert());
    });
  });

  describe("Security Login Functionality Test", () => {
    before(() => {
      cy.fixture("auth/login.data.json").as("LoginTestData");
      cy.get("@LoginTestData").then(($data) => {
        loginTestdata = $data;
      });
    });

    beforeEach(() => {
      welcomePage.visitLogin();
      welcomePage.navigateToLogin();
      loginPage.fillEmail(loginTestdata.validUser.email);
      loginPage.fillPassword(loginTestdata.validUser.password);
      loginPage.submitLogin();
    });

    it("Asking for login again after clear browser cookies", () => {
      assert.isUrlContains(loginTestdata.expectedData.homeUrlPath);
      homePage.visitProfile();
      cy.clearCookies();
      welcomePage.visitHome();
      welcomePage.navigateToLogin();
      assert.isElementVisible(loginPage.getEmailElement());
      assert.isElementVisible(loginPage.getPasswordElement());
    });

    it("When tap back after login user should be in home screen", () => {
      assert.isUrlContains(loginTestdata.expectedData.homeUrlPath);
      cy.go("back");
      assert.isUrlContains(loginTestdata.expectedData.homeUrlPath);
    });
  });
});
