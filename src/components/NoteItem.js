import React from 'react'

const NoteItem = (props) => {
    const { note } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-item-center justify-content-between">
                    <h5 className="card-title">{note.title}</h5>
                    <div className="">
                    <i className="fa-solid fa-trash mx-2"></i>
                    <i className="fa-solid fa-pen-to-square"></i>
                    </div>
                    </div>
                    
                    <p className="card-text">{note.description}</p>
                    
                </div>
            </div>
        </div>
    )
}

export default NoteItem
