import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const [notes, setNotes] = useState([])
  const host = "http://localhost:5000";

  const getNotes = async() => {
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwZjFiNTNlYjFlMWYxODhkODFjYzBhIn0sImlhdCI6MTY3OTA0NTM3N30.hi0Z2FMs6PadvIqzYXAQUvShS_BPWvBj1-19ko3a2jo"
      }
    });
    const json = await response.json();
    // console.log(json)
    setNotes(json)
    console.log(notes)
  }


  // Add  a note 
  const addNote = (title, description, tags) => {
    //API CALL

    const note = {
      "_id": "64145047sdf0a7fd6b165c3081a574",
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
  const deleteNote = async (id) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwZjFiNTNlYjFlMWYxODhkODFjYzBhIn0sImlhdCI6MTY3OTA0NTM3N30.hi0Z2FMs6PadvIqzYXAQUvShS_BPWvBj1-19ko3a2jo"
      }
    });
    const json = response.json();
    console.log(json)
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote)

  }

  // Edit  a note
  const editNote = (id, title, description, tags) => {
    //API CALL

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tags = tags;
      }
    }
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState