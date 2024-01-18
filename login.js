import React, { useState, useContext } from 'react';
import firebase from 'firebase';
import Card from './Card';
import UserContext from './UserContext';

function Login() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');
  const [success, setSuccess] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const ctx = useContext(UserContext);

  const handleLogin = async () => {
    try {
      // Validate field requirements
      if (!validate(email, 'email') || !validate(password, 'password')) {
        return;
      }

      const auth = firebase.auth();
      const userCredential = await auth.signInWithEmailAndPassword(email, password);

      // Authentication successful, fetch user data from the server
      const response = await fetch(`/account/login/${email}/${password}`);
      const text = await response.text();

      try {
        const data = JSON.parse(text);
        setShow(false);
        setUser(data.name);
        setLoaded(true);
        setSuccess(true);
        ctx.user = data.name;
        ctx.email = data.email;
      } catch {
        setMessage(text);
        setSuccess(false);
        setShow(false);
      }
    } catch (error) {
      // Handle authentication or server-side errors
      setLoaded(false);
      setStatus(`Error: ${error.message}`);
      setTimeout(() => setStatus(''), 3000);
      console.error('Login error:', error.message);
    }
  };

  const validate = (field, label) => {
    if (!field) {
      setStatus(`Error: ${label} is required`);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  };

  const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(true);

    return (
      <>
        Email
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
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.currentTarget.value);
            setDisabled(false);
          }}
        />
        <br />
        <div className="login-btn">
          <button
            type="submit"
            className="btn btn-light"
            onClick={handleLogin}
            disabled={disabled}
          >
            Login
          </button>
        </div>
      </>
    );
  };

  const LoginMessage = (props) => (
    <>
      {success ? (
        <>
          <h5>You have successfully logged in.</h5>
          <a href="#/balance/">
            <button
              type="submit"
              className="btn btn-light"
              onClick={() => props.setShow(true)}
            >
              Proceed to Account
            </button>
          </a>
        </>
      ) : (
        <>
          <h5>{message}</h5>
          <button
            type="submit"
            className="btn btn-light"
            onClick={() => props.setShow(true)}
          >
            Try Again
          </button>
        </>
      )}
    </>
  );

  return (
    <>
      {loaded ? (
        <div className="hi-msg">User: {user}</div>
      ) : (
        <div></div>
      )}

      <div className="login-card">
        <Card
          txtcolor="white"
          bgcolor="dark"
          header="Login"
          status={status}
          body={
            show ? (
              <LoginForm />
            ) : (
              <LoginMessage setShow={setShow} />
            )
          }
        />
      </div>
    </>
  );
}

export default Login;


