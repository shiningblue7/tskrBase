// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, Private } from '@redwoodjs/router'
import GroupRolesLayout from 'src/layouts/GroupRolesLayout'
import UsersLayout from 'src/layouts/UsersLayout'
import GroupMembersLayout from 'src/layouts/GroupMembersLayout'
import GroupsLayout from 'src/layouts/GroupsLayout'
import PreferencesLayout from 'src/layouts/PreferencesLayout'
import Standard from './layouts/Standard/Standard'

const Routes = () => {
  return (
    <Router>
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Set wrap={Standard}>
        <Route path="/logout" page={LogoutPage} name="logout" />
        <Route path="/" page={HomePage} name="home" />
        <Private unauthenticated="home">
          <Route path="/about" page={AboutPage} name="about" />

          <Set wrap={GroupsLayout}>
            <Private unauthenticated="home" role={['admin', 'groupCreate']}>
              <Route path="/groups/new" page={GroupNewGroupPage} name="newGroup" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'groupUpdate', 'groupRead']}>
              <Route path="/groups/{id:Int}" page={GroupEditGroupPage} name="group" />
              <Route path="/groups" page={GroupGroupsPage} name="groups" />
            </Private>
          </Set>
          <Set wrap={PreferencesLayout}>
            <Private unauthenticated="home">
              <Route path="/preferences/new" page={PreferenceNewPreferencePage} name="newPreference" />
            </Private>
            <Private unauthenticated="home">
              <Route path="/preferences/{id:Int}" page={PreferenceEditPreferencePage} name="preference" />
              <Route path="/preferences" page={PreferencePreferencesPage} name="preferences" />
            </Private>
          </Set>
          <Set wrap={UsersLayout}>
            <Private unauthenticated="home" role={['admin', 'userCreate']}>
              <Route path="/users/new" page={UserNewUserPage} name="newUser" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'userUpdate', 'userRead']}>
              <Route path="/users/{id:Int}" page={UserEditUserPage} name="user" />
              <Route path="/users" page={UserUsersPage} name="users" />
            </Private>
          </Set>
          <Set wrap={GroupMembersLayout}>
            <Private unauthenticated="home" role={['admin', 'groupMemberCreate']}>
              <Route path="/group-members/new" page={GroupMemberNewGroupMemberPage} name="newGroupMember" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'groupMemberUpdate', 'groupMemberRead']}>
              <Route path="/group-members/{id:Int}" page={GroupMemberEditGroupMemberPage} name="groupMember" />
              <Route path="/group-members" page={GroupMemberGroupMembersPage} name="groupMembers" />
            </Private>
          </Set>
          <Set wrap={GroupRolesLayout}>
            <Private unauthenticated="home" role={['admin', 'groupRoleCreate']}>
              <Route path="/group-roles/new" page={GroupRoleNewGroupRolePage} name="newGroupRole" />
            </Private>
            <Private unauthenticated="home" role={['admin', 'groupRoleUpdate', 'groupRoleRead']}>
              <Route path="/group-roles/{id:Int}" page={GroupRoleEditGroupRolePage} name="groupRole" />
              <Route path="/group-roles" page={GroupRoleGroupRolesPage} name="groupRoles" />
            </Private>
          </Set>
        </Private>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
