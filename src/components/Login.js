import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css"
const Login = (props) => {
    const { showAlert } = props;
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const host = "http://localhost:5000";
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        //   console.log(json)
        if (json.success) {
            //store auth token in local storage and redirect
            localStorage.setItem('token', json.authToken)
            showAlert("Login Successfully", "success")
            navigate("/")
        }
        else {
            showAlert("Invalid crendentials", "danger")

        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="sign-up-modal" id='login-modal'>
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
                    <input className="col-sm-5 col-sm-push-2 password-input with-placeholder" id="password-login" type="password" placeholder="Password" name="password" onChange={onChange} minLength={5} required />
                </div>

                <div className="col-sm-12 form-checkbox">
                    <label>
                        <input type="checkbox" value="true" /> Keep me signed in</label>
                </div>

                <input id="sign-up-button" type="submit" value="Log In" className='sign-up-button' />


            </form>
        </div>
    )
}

export default Login
