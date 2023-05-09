import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteModal from './NoteModal';
import { useSearchParams } from 'react-router-dom';

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
                    <div className="card-body">
                        <div className="d-flex align-item-center justify-content-between">
                            <h5 className="card-title">{note.title}</h5>
                            <div className="">
                                <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id); showAlert("Deleted Successfully", "success") }}></i>
                                <i className="fa-solid fa-pen-to-square" onClick={() => (updateNote(note))}></i>
                            </div>
                        </div>
                        <p className="card-text">{numOfWords > 10 ? shortPara + "...." : shortPara}<span onClick={()=>handlePopup(note)} className='text-danger cursor'>{numOfWords > 10 ? "Read more" : " View"}</span></p>
                    </div>
                </div>
            </div>
            
            {/* <div className="preview-card">
                <div className="preview">
                    <h3 className='text-end close-sign'><i className="fa-solid fa-xmark text-end"></i></h3>
                    <div className="d-flex align-item-center justify-content-between my-3">
                        <h5 className="card-title"></h5>
                        <div className="">
                            <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id); showAlert("Deleted Successfully", "success") }}></i>
                            <i className="fa-solid fa-pen-to-square" onClick={() => (updateNote(note))}></i>
                        </div>
                    </div>
                    <p className="card-text"></p>
                </div>
            </div> */}
        </>


    )
}

export default NoteItem
