import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Navbar() {

  return (
    <nav>
      <NavLink to="/">
        Friender
      </NavLink>
      <NavLink to="/signup">
        Signup
      </NavLink>
      <NavLink to="/login">
        Login
      </NavLink>
      <NavLink to="/friendsfinder">
        Friends Finder
      </NavLink>
      <NavLink to="/profile">
        Profile
      </NavLink>
      <NavLink to="/friends">
        Friends
      </NavLink>
      <NavLink to="/messages">
        Messages
      </NavLink>
    </nav>
  );
}

export default Navbar;
