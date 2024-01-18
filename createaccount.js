import React, { useState, useContext } from 'react';
import firebase from 'firebase'; // Make sure to import Firebase properly
import Card from './Card'; // Import the Card component
import UserContext from './UserContext'; // Import the UserContext

function CreateAccount() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const ctx = useContext(UserContext);

  async function handleCreate() {
    try {
      // Validate field requirements
      if (!validate(name, "name") || !validate(email, "email") || !validate(password, "password")) {
        return;
      }

      setLoading(true);

      // OAuth with Google Firebase
      const auth = firebase.auth();
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);


      // Hide the form and show success message
      setShow(false);
    } catch (error) {
      // Handle errors more gracefully
      console.error("Error creating account:", error.message);
      setStatus("Error creating account: " + getErrorMessage(error));
      setTimeout(() => setStatus(""), 3000);
    } finally {
      setLoading(false);
    }
  }

  function getErrorMessage(error) {
    // Add logic to extract and return specific error messages
    // based on error codes or types from Firebase or MongoDB.
    return "An error occurred during account creation.";
  }

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label + " is required");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (label === "password" && field.length < 8) {
      setStatus("Error: " + label + " must be at least 8 characters");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  const CreateAccountForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(true);

    return (
      <>
        Name
        <br />
        <input
          type="input"
          className="form-control"
          id="name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
            setDisabled(false);
          }}
        />
        <br />
        Email address
        <br />
        <input
          type="input"
          className="form-control"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
            setDisabled(false);
          }}
        />
        <br />
        Password
        <br />
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Must be 8+ characters"
          value={password}
          onChange={(e) => {
            setPassword(e.currentTarget.value);
            setDisabled(false);
          }}
        />
        <br />
        <button
          type="submit"
          className="btn btn-light"
          onClick={handleCreate}
          disabled={disabled || loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </>
    );
  };

  const CreateMessage = () => (
    <>
      <h5 id="status">You created your account.</h5>
      <a href="#/login/">
        <button type="submit" className="btn btn-light" id="status-btn">
          Click to Log In
        </button>
      </a>
    </>
  );

  return (
    <div className='CreateAccountPage'>
      <div id='user-info'><h1 className='user-info'></h1></div>
      <Card
        txtcolor="white"
        bgcolor="dark"
        header="Create Account"
        status={status}
        body={show ? <CreateAccountForm /> : <CreateMessage />}
      />
    </div>
  );
}

export default CreateAccount;
