import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
   const notesInitial = [
    {
      "_id": "64144da080a19ab0fde36dc42",
      "user": "640f1b53eb1e1f188d81cc0a",
      "title": "Updated title2",
      "description": "Now description is also updated  so dont  touch  it",
      "tags": "Learning from youtube",
      "date": "2023-03-17T11:23:12.272Z",
      "__v": 0
    },
    {
      "_id": "64144f07ce064sd908e841298",
      "user": "640f1b53eb1e1f188d81cc0a",
      "title": "My Title",
      "description": "Wake up early in the monigand start working out",
      "tags": "personal",
      "date": "2023-03-17T11:29:11.224Z",
      "__v": 0
    },
    {
      "_id": "64145047076bf165c3081a574",
      "user": "640f1b53eb1e1f188d81cc0a",
      "title": "Your Title",
      "description": "Wake up early in the monigstart working out",
      "tags": "personal",
      "date": "2023-03-17T11:34:31.772Z",
      "__v": 0
    },
    {
      "_id": "64144f07ce06d4d908e841298",
      "user": "640f1b53eb1e1f188d81cc0a",
      "title": "My Title",
      "description": "Wake up early in the monigand start working out",
      "tags": "personal",
      "date": "2023-03-17T11:29:11.224Z",
      "__v": 0
    },
    {
      "_id": "641450470a76b165c3081a574",
      "user": "640f1b53eb1e1f188d81cc0a",
      "title": "Your Title",
      "description": "Wake up early in the monigstart working out",
      "tags": "personal",
      "date": "2023-03-17T11:34:31.772Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(notesInitial)

  // Add  a note 
  const addNote = (title, description, tags) => {
    console.log("Adding a new note")
    const note = {
      "_id": "641450470a7fd6b165c3081a574",
      "user": "640f1sdb53eb1e1f188d81cc0a",
      "title": title,
      "description": description,
      "tags": tags,
      "date": "2023-03-17T11:34:31.772Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }
  // Delete a note 
  const deleteNote = () => {

  }
  // Edit  a note 
  const editNote = () => {

  }
    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState