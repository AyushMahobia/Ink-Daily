import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tags: "" })

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tags)
    }
    return (
        <div>
            <div className='container my-3'>
                <h1>Add Note</h1>
                <div className="container my-3">
                    <form>
                        <div className="form-group my-3">
                            <label forhtml="title">Title</label>
                            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter a title" onChange={onChange} />
                        </div>
                        <div className="form-group my-3">
                            <label forhtml="description">Description</label>
                            <input type="text" className="form-control" id="description" name="description" placeholder="Add a description" onChange={onChange} />
                        </div>
                        <div className="form-group my-3">
                            <label forhtml="tags">Tags</label>
                            <input type="text" className="form-control" id="tags" name="tags" placeholder="Add a tags" onChange={onChange} />
                        </div>
                        
                        <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNote
