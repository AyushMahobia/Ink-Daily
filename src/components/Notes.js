import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote'

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(()=>{
    getNotes();
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <AddNote />
      <div className="row my-3  mx-2">
        <h2 className="my-3">Your Notes</h2>
        {notes.map(note => {
          return (
            <NoteItem key={note._id} note={note} />
          )
        })}
      </div>
    </>

  )
}

export default Notes
