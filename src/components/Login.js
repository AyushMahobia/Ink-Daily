import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const {showAlert} = props;
    const [credentials, setCredentials] = useState({email:"", password:""})
    const host = "http://localhost:5000";
    const navigate = useNavigate();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
          const json = await response.json();
        //   console.log(json)
        if(json.success){
            //store auth token in local storage and redirect
            localStorage.setItem('token', json.authToken)
            showAlert("Login Successfully", "success")
            navigate("/")
        }
        else{
            showAlert("Invalid crendentials", "danger")

        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }
    return (
        <div className='container'>
            <h2 className='text-center'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
