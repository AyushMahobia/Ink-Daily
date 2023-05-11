import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom';
import NoteModal from './NoteModal';

const Notes = (props) => {
  const navigate = useNavigate();
  const { showAlert } = props;
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, deleteNote } = context;
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etags: "" })

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    }
    else {
      navigate("/login")
    }
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etags: currentnote.tags })
    // console.log(note.id);

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

  const [popupContent, setPopupContent] = useState([]);
  const handlePopUp = (info) => {
    setPopupContent([info]);
    setClose(!close)
  }
  const [close, setClose] = useState(false)
  return (
    <>
      <AddNote showAlert={showAlert} />

      {/* update modal */}
      <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModalCenter">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content update">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Update Note</h5>
              <button type="button" className="close border-0 bg-transparent text-light" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" style={{ fontSize: "2rem" }}>&times;</span>
              </button>
            </div>
            <div className="modal-body update">
              <form>
                <div className="form-group my-3">
                  <label htmlFor="etitle">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" placeholder="Enter a title" onChange={onChange} />
                </div>
                <div class="form-group my-3">
                  <label htmlFor="edescription">Description</label>
                  <textarea class="form-control" id="edescription" rows="3" name="edescription" placeholder="Add a description" value={note.edescription} onChange={onChange}></textarea>
                </div>
                <div className="form-group my-3">
                  <label htmlFor="etags">Tags</label>
                  <input type="text" className="form-control" id="etags" value={note.etags} name="etags" placeholder="Add a tags" onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-danger" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-warning" onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      {/* Your notes */}
      <div className="row my-3 mx-2">
        <h2 className="my-3">Your Notes</h2>
        <form className="d-flex my-2">
          <input className="form-control me-2" type="search" placeholder="Search by tag" aria-label="Search" style={{background: "antiquewhite",
                        color: "#333"}}/>
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        {notes.map(note => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={showAlert} handlePopup={handlePopUp} />
          )
        })}
      </div>

      {/* Note modal */}
      <div className={`preview-card ${close ? "active-one" : ""}`}>
        <div className={`preview ${close ? "active-two" : ""}`}>
          <h3 className='text-end close-sign' onClick={() => setClose(!close)}><i className="fa-solid fa-xmark text-end"></i></h3>
          {popupContent.map((pop, ind) => {
            return (
              <NoteModal pop={pop} id={pop._id} des={pop.description} title={pop.title} key={ind} />
            )
          })}
        </div>
      </div>
    </>

  )
}

export default Notes
