import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const [notes, setNotes] = useState([])
  const host = "http://localhost:5000";
  
  // Get all notes
  const getNotes = async () => {
    //API CALL
    //backend part
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json)
    
    //frontend part
    setNotes(json)
  }

  // Add  a note 
  const addNote = async (title, description, tags) => {
    //API CALL
    //backend part
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tags}), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json)

    //frontend part
    setNotes(notes.concat(json))
  }

  // Delete a note 
  const deleteNote = async (id) => {
    //API CALL
    //backend part
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json)

    //frontend part
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote)
  }

  // Edit  a note
  const editNote = async (id, title, description, tags) => {
    //API CALL
    //backend part
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tags})
    });
    const json = await response.json();
    console.log(json)

    //frontend part
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tags = tags;
        break;
      }
    }
    setNotes(newNotes)
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState