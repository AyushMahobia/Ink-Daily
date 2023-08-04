import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
    const { showAlert, handlePopup } = props;
    const context = useContext(noteContext);
    const { note, updateNote } = props;
    const { deleteNote } = context;

    let shortPara = note.description.split(" ").slice(0, 10).join(" ");
    let numOfWords = note.description.split(" ").length;


    return (
        <>
            <div className='col-md-3'>
                <div className="card my-3">
                    <div className="card-body" style={{
                        background: "#333",
                        color: "antiquewhite"
                    }}>
                        <div className="d-flex align-item-center justify-content-between">
                            <h5 className="card-title">{note.title}</h5>
                            <div className="">
                                <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id); showAlert("Deleted Successfully", "success") }}></i>
                                <i className="fa-solid fa-pen-to-square" onClick={() => (updateNote(note))}></i>
                            </div>
                        </div>
                        <p className="card-text">{numOfWords > 10 ? shortPara + "...." : shortPara}<span onClick={() => handlePopup(note)} className='text-warning cursor'>{numOfWords > 10 ? "Read more" : " View"}</span></p>
                    </div>
                </div>
            </div>
        </>


    )
}

export default NoteItem
