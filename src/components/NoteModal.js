import React from 'react'

const NoteModal = (props) => {
    const { title, des, id, pop } = props;
    // id and pop is for future use
    return (
        <>
            <div>
                <div className="d-flex align-item-center justify-content-between my-3">
                    <h5 className="card-title">{title}</h5>
                    <div>
                        {/* <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(pop._id); showAlert("Deleted Successfully", "success") }}></i>
                        <i className="fa-solid fa-pen-to-square" onClick={() => (updateNote(pop))}></i> */}
                        {/* Above code is for future updates */}
                    </div>
                </div>
                <p className="card-text">{des}</p>
            </div>
        </>
    )
}

export default NoteModal
