/**********************************************************************************************************************
 * This file contains assertion methods to assert for various interactable elements
 ***********************************************************************************************************************/

class Assertion {
  /*
   * Method to assert that a URL is valid and the same as a certain text
   * @param  urlText The text to assert on.
   */
  isUrlMatch(urlText) {
    cy.url({ timeout: 30000 }).should("eq", urlText);
  }
  /*
   * Method to assert that a URL contains a certain text
   * @param  text The text to assert on.
   */
  isUrlContains(text) {
    cy.url().should("contains", text);
  }
  /*
   * Method to assert that a text is visible in a certain element
   * @param  text The text to assert on.
   */
  isElementVisible(element) {
    element.should("be.visible");
  }
}
export default Assertion;
