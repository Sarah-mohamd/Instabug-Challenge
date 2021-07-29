import ProfileSelector from "../selectors/auth/profile.selectors";

class ProfilePage {
  getUserName() {
    return cy.get(ProfileSelector.userName);
  }
}
export default ProfilePage;
