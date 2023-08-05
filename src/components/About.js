import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import { useNavigate } from 'react-router-dom';

export default function About() {
  const { getUser, user } = useContext(noteContext);
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token')){
      getUser();
    }
    else{
      navigate("/login")
    }
  },[])
  return (
    <div>
      <h1>{user.name}</h1>
      <h4>{user.email}</h4>
    </div>
  )
}
