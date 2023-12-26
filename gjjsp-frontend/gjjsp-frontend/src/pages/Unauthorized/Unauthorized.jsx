import React from 'react'
import {useNavigate } from 'react-router-dom'

export default function Unauthorized() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/login');
  };
  return (
    <>
    <div>Unauthorized</div>
    <button onClick={goBack}>Go Back</button>
    </>
  )
}
