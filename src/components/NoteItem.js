import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
    const {showAlert} = props;
    const context = useContext(noteContext);
    const { note, updateNote } = props;
    const { deleteNote } = context;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-item-center justify-content-between">
                    <h5 className="card-title">{note.title}</h5>
                    <div className="">
                    <i className="fa-solid fa-trash mx-2" onClick={() =>{ deleteNote(note._id); showAlert("Deleted Successfully", "success")}}></i>
                    <i className="fa-solid fa-pen-to-square" onClick={() => (updateNote(note))}></i>
                    </div>
                    </div>
                    
                    <p className="card-text">{note.description}</p>
                    
                </div>
            </div>
        </div>
    )
}

export default NoteItem
