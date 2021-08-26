import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Homepage from './Homepage';
import SignUpForm from './SignUpForm';
import LogInForm from './LogInForm';
import FriendsFinder from './FriendsFinder';
import ProfileForm from './ProfileForm';
import FriendsPage from './FriendsPage';
import MessagesPage from './MessagesPage';

function Routes({ logIn, signUp, handleUpdate }) {
  console.debug(
    "Routes",
    `logIn=${typeof logIn}`,
    `register=${typeof register}`,
  );

  return (
    <div className="pt-5">
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/signUp">
          <SignUpForm signUp={signUp}/>
        </Route>
        <Route exact path="/logIn">
          <LogInForm logIn={logIn}/>
        </Route>
        <Route exact path="/friendsfinder">
          <FriendsFinder />
        </Route>
        <Route exact path="/profile">
          <ProfileForm handleUpdate={handleUpdate}/>
        </Route>
        <Route exact path="/friends">
          <FriendsPage />
        </Route>
        <Route exact path="/friends/:username">
          <FriendsPage />
        </Route>
        <Route exact path="/messages">
          <MessagesPage />
        </Route>
        <Route exact path="/messages/:id">
          <MessagesPage />
        </Route>
        <Route exact path="/uploads/s3">
          <MessagesPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes;
