import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
// import "../Styles/Signup.css"
import "../Styles/Signup.css"
const Signup = (props) => {
  const { showAlert } = props;
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
  const host = "http://localhost:5000";
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    // console.log(json)
    if (json.success) {
      localStorage.setItem('token', json.authToken)
      navigate("/")
      showAlert("Sign Up Successfully", "success")
    }
    else {
      showAlert("Invalid crendentials", "danger")
    }

  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    // <div className='container'>
    //   <h2 className='text-center'>Singup for Ink-Daily</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div className="form-group my-3">
    //       <label htmlFor="name">Name</label>
    //       <input type="text" className="form-control" id="name" name="name" placeholder="Enter a name" onChange={onChange} required />
    //     </div>
    //     <div className="form-group my-3">
    //       <label htmlFor="email">Email address</label>
    //       <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} required />
    //       <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    //     </div>
    //     <div className="form-group my-3">
    //       <label htmlFor="password">Password</label>
    //       <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={onChange} minLength={5} required />
    //     </div>
    //     <button type="submit" className="btn btn-primary">Submit</button>
    //   </form>
    // </div>
    <div className="sign-up-modal">
      {/* <div id="close-modal-button">
		  </div> */}
      <div className="logo-container">
        <svg className="logo" width="94.4px" height="56px">
          <g>
            <polygon points="49.3,56 49.3,0 0,28 	" />
            <path d="M53.7,3.6v46.3l40.7-23.2L53.7,3.6z M57.7,10.6l28.4,16.2L57.7,42.9V10.6z" />
          </g>
        </svg>
      </div>

      <form className="details" onSubmit={handleSubmit}>
        <div className="input-container">
          <input className="col-sm-12 email-input with-placeholder" id="email" type="email" placeholder="Email" name="email" onChange={onChange} required />
        </div>
        <div className="input-container">
          <input className="col-sm-5 username-input with-placeholder" id="username" type="text" placeholder="Username" maxLength="8" name="name" onChange={onChange} required />
        </div>
        <div className="input-container">
          <input className="col-sm-5 col-sm-push-2 password-input with-placeholder float-right" id="password" type="password" placeholder="Password" name="password" onChange={onChange} minLength={5} required />
        </div>

        <div className="col-sm-12 form-checkbox">
          <label>
            <input type="checkbox" value="true" /> Keep me signed in</label>
        </div>

        <input  type="submit" value="Sign Up" />

        <p>Already have an account? <Link to="/login" className='a'>Sign in</Link></p>

      </form>
    </div>
  )
}

export default Signup
