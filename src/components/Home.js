import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

export default function Home() {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;
  return (
    <>
      <div className='container my-3'>
        <h1>Add Note</h1>
        <div className="container my-3">
          <form>
            <div class="form-group my-3">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group my-3">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div class="form-check my-2">
              <input type="checkbox" class="form-check-input" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
        <h2 className="my-3">Your Notes</h2>
      </div>
      <div className="container my-3">
        {notes.map(note =>{
          return(
           <p>{note.title}</p>
          )
        })}
      </div>
    </>

  )
}
