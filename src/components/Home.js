import React from 'react'
import Notes from './Notes'

export default function Home() {
  return (
    <>
      <div className='container my-3'>
        <h1>Add Note</h1>
        <div className="container my-3">
          <form>
            <div className="form-group my-3">
              <label forhtml="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group my-3">
              <label forhtml="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="form-check my-2">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" forhtml="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
      <Notes/>
    </>

  )
}
