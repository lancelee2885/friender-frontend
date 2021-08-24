import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /FriendsFinder route
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */

function SignupForm({ signup }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    age: "",
    hobbies: [],
    interests: [],
    location: "",
    friendRadius: 50
  });

  const [formErrors, setFormErrors] = useState([]);

  console.debug(
      "SignupForm",
      "signup=", typeof signup,
      "formData=", formData,
      "formErrors=", formErrors,
  );

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /FriendsFinder.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await signup(formData);
      history.push("/FriendsFinder");
    } catch (err) {
      setFormErrors(err);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
      <div className="SignupForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h2 className="mb-3">Sign Up</h2>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                      name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>First name</label>
                  <input
                      name="firstName"
                      className="form-control"
                      value={formData.firstName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last name</label>
                  <input
                      name="lastName"
                      className="form-control"
                      value={formData.lastName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                  />
                </div>





                <div className="form-group">
                  <p>Gender: </p>
                    <label htmlFor="male">Male</label>
                    <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        onChange={handleChange}
                        className="form-control"
                        // checked={form.type === 'gender'}
                    />
                    <label htmlFor="female">Female</label>
                    <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        onChange={handleChange}
                        className="form-control"
                        // checked={form.type === 'gender'}
                    />                         
                </div>

                <div className="form-group">
                  <label htmlFor="age">Select your age:</label>
                  <select name="age" id="age">
                  <option value="choose">Please choose an age</option>
                    <option value="under18">Under 18</option>
                    {Array.from({length: 48}, (_, i) => i + 18)
                    .map(a => <option value={`${a}`}>{a}</option>)
                    }
                    <option value="over65">Over 65</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Hobbies</label>
                  <input
                    type="checkbox" id="hobbies" name="hobbies" value="Hiking" onChange={handleChange}></input>
                  <label htmlFor="hobbies">Hiking</label>
                  <input
                    type="checkbox" id="hobbies" name="hobbies" value="Cooking" onChange={handleChange}></input>
                  <label htmlFor="hobbies">Cooking</label>
                  <input
                    type="checkbox" id="hobbies" name="hobbies" value="Reading" onChange={handleChange}></input>
                  <label htmlFor="hobbies">Reading</label>
                </div>



                {/* // continue here */}


                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                }

                <button
                    type="submit"
                    className="btn btn-primary float-right"
                    onSubmit={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default SignupForm;