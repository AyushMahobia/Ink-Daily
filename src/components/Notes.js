import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const navigate = useNavigate();
  const {showAlert} = props;
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etags: "" })

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate("/login")
    }
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etags: currentnote.tags})
    console.log(note.id);
   
  }


  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const handleClick = (e) => {
    // e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etags)
    refClose.current.click();
    // console.log("Updating a note", note);
    showAlert("Updated Successfully", "success")
  }

  return (
    <>
      <AddNote showAlert={showAlert}/>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModalCenter">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button type="button" className="close border-0 bg-transparent" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" style={{ fontSize: "2rem" }}>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group my-3">
                  <label forhtml="etitle">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" placeholder="Enter a title" onChange={onChange} />
                </div>
                <div className="form-group my-3">
                  <label forhtml="edescription">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" placeholder="Add a description" value={note.edescription} onChange={onChange} />
                </div>
                <div className="form-group my-3">
                  <label forhtml="etags">Tags</label>
                  <input type="text" className="form-control" id="etags" value={note.etags} name="etags" placeholder="Add a tags" onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3  mx-2">
        <h2 className="my-3">Your Notes</h2>
        {notes.map(note => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={showAlert}/>
          )
        })}
      </div>
    </>

  )
}

export default Notes
