import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// import UploadImageToS3WithNativeSdk from "./UploadImageToS3WithNativeSdk";
import UploadImagetoS3WithFileReaderAPI from "./UploadImagetoS3WithFileReaderAPI"
import UserContext from "./UserContext";
import {getS3Image} from "./s3"
import {REACT_APP_S3_BUCKET} from "./secret" 


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

function ProfileForm({ handleUpdate }) {

  const currUser = useContext(UserContext) || {};

  const {username, firstName, lastName, email, gender, age, location, friendRadius, imgID} = currUser;

  const history = useHistory();
  const [formData, setFormData] = useState({
    username: username,
    password: "",
    firstName: firstName,
    lastName: lastName,
    email: email,
    gender: gender,
    age: age,
    // hobbies: [],
    // interests: [],
    location: location,
    friendRadius: friendRadius
  });

  const [step, setStep] = useState("step1");

  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "ProfileForm",
    "signup=", typeof signup,
    "formData=", formData,
    "formErrors=", formErrors,
  );

  /** Handle form submit:
   *
   * Calls logIn func prop and, if successful, redirect to /FriendsFinder.
   */

  async function update(evt) {
    evt.preventDefault();
    try {

      await handleUpdate(formData, username);
      // history.push("/FriendsFinder");
      setStep("step2")
    } catch (err) {
      setFormErrors(err);
    }
  }

  /** TODO: Once user upload an image, redirect to homepage/profile page */
  async function handleSubmitPhoto(evt) {
    evt.preventDefault();
    try {
      history.push("/FriendsFinder");
    } catch (err) {
      setFormErrors(err);
    }
  }

  function skip(){
    history.push("/FriendsFinder");
  }


  /** Update form data field */
  function handleChange(evt) {

    const { name, value } = evt.target;
    const hobbies = Array.from(document.querySelectorAll("input[name=hobbies]:checked")).map(i => i.value);
    const interests = Array.from(document.querySelectorAll("input[name=interests]:checked")).map(i => i.value);

    setFormData(data => (
      { ...data, 
        [name]: value,
        // "hobbies": hobbies,
        // "interests": interests,
      }));
  }

  const allRanges = document.querySelectorAll(".range-wrap");
  allRanges.forEach(wrap => {
    const range = wrap.querySelector(".range");
    const bubble = wrap.querySelector(".bubble");

    range.addEventListener("input", () => {
      setBubble(range, bubble);
    });
    setBubble(range, bubble);
  });

  function setBubble(range, bubble) {
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    bubble.innerHTML = val;

    // Sorta magic numbers based on size of the native UI thumb
    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
  } 

  return (
    step === "step1" 
    ?
    <div className="ProfileForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Edit Profile</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={update}>
              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                  disabled
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
                <span>Gender: </span>
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="M"
                  onChange={handleChange}
                  className="form-control"
                />
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="F"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="age">Select your age:</label>
                <select name="age" id="age" onChange={handleChange}>
                  <option value="choose" selected>Please choose an age</option>
                  <option value="under18">Under 18</option>
                  {Array.from({ length: 48 }, (_, i) => i + 18)
                    .map(a => <option value={`${a}`}>{a}</option>)
                  }
                  <option value="over65">Over 65</option>
                </select>
              </div>

              <div className="form-group">
                <label>Hobbies</label>
                <input
                  type="checkbox" id="hobbies" name="hobbies" value="Hiking" onChange={handleChange}></input>
                <label htmlFor="hiking">Hiking</label>
                <input
                  type="checkbox" id="hobbies" name="hobbies" value="Cooking" onChange={handleChange}></input>
                <label htmlFor="cooking">Cooking</label>
                <input
                  type="checkbox" id="hobbies" name="hobbies" value="Reading" onChange={handleChange}></input>
                <label htmlFor="reading">Reading</label>
              </div>

              <div className="form-group">
                <label>Interests</label>
                <input
                  type="checkbox" id="games" name="interests" value="games" onChange={handleChange}></input>
                <label htmlFor="games">Games</label>
                <input
                  type="checkbox" id="interest1" name="interests" value="interest1" onChange={handleChange}></input>
                <label htmlFor="interest1">Interest1</label>
                <input
                  type="checkbox" id="interest2" name="interests" value="interest2" onChange={handleChange}></input>
                <label htmlFor="interest2">Interest2</label>
              </div>

              <div className="form-group">
                <label htmlFor="location">Zip Code</label>
                <input
                  id="location" name="location" value={formData.location} onChange={handleChange}></input>
              </div>

              <div className="range-wrap">
                <label htmlFor="friendRadius">Friend Radius (km)</label>
                <input type="range" className="range" name="friendRadius" id="friendRadius" value={formData.friendRadius} onChange={handleChange}></input>
                <output className="bubble"></output>
              </div>
 
              {/* // continue here */}

              {/* 
                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                } */}

              <button
                type="submit"
                className="btn btn-primary float-right"
              >
                Next >
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    :
    <div>
      <h3>Current Profile Picture</h3>
      <img src={`https://${REACT_APP_S3_BUCKET}.s3.amazonaws.com/${imgID}`} alt=""></img>
      <UploadImagetoS3WithFileReaderAPI username={formData.username}/>   
      <button onClick={handleSubmitPhoto}>
        Finish Uploading
      </button>  
      <button onClick={skip}>
        Skip
      </button>       
    </div>
  );
}

export default ProfileForm;