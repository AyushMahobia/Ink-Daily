import React from 'react'

const NoteModal = (props) => {
    const { title, des } = props;
    return (
        <>
            <div>
                <div className="d-flex align-item-center justify-content-between my-3">
                    <h5 className="card-title">{title}</h5>
                </div>
                <p className="card-text">{des}</p>
            </div>
        </>
    )
}

export default NoteModal
