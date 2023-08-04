import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
    let navigate = useNavigate();
    const location = useLocation();
    // console.log(location.pathname)
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');

    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand mx-2" to="/">iNotebook</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                </div>
                {!localStorage.getItem('token') ? <div className="d-flex">
                    <Link className="btn btn-info mx-1 btn-info" to="/signup">Sign up</Link>
                    <Link className="btn btn-info mx-1 btn-primary" to="/login">Login</Link>
                </div> : <button className='btn btn-danger' onClick={handleLogout}>Log out</button>}
            </div>
        </nav>
    )
}
