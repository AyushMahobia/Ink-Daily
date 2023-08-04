import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const { showAlert } = props;
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tags: "" })

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        addNote(note.title, note.description, note.tags)
        setNote({ title: "", description: "", tags: "" })
        showAlert("Added note", "success")

    }
    const [open, setOpen] = useState(true)
    const handleOpen = {
        visibility: "hidden",
        display: "none"
    }
    const handleClose = {
        visibility: "visible",
        display: "block"
    }
    return (
        <div>
            <div className='container my-3'>
                <button type='button' className={`btn mx-2 text-uppercase ${open ? "btn-warning" : "btn-danger"}`} onClick={() => setOpen(!open)}>{open ? <>	&#43;Add note</> : <>&minus;Close</>}</button>
                <div className="container my-3 add-btn" style={open ? handleOpen : handleClose}>
                    <h1>Add Note</h1>
                    <form>
                        <div className="form-group my-3">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter a title" onChange={onChange} value={note.title} style={{
                                background: "antiquewhite",
                                color: "#333"
                            }} />
                        </div>
                        <div class="form-group my-3">
                            <label htmlFor="description">Description</label>
                            <textarea class="form-control" id="description" rows="3" name="description" placeholder="Add a description" value={note.description} onChange={onChange} style={{
                                background: "antiquewhite",
                                color: "#333"
                            }}></textarea>
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="tags">Tags</label>
                            <input type="text" className="form-control" id="tags" name="tags" placeholder="Add a tags" onChange={onChange} value={note.tags} style={{
                                background: "antiquewhite",
                                color: "#333"
                            }} />
                        </div>

                        <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNote
