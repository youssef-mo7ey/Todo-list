import React from 'react'

export default function EditForm(props) {
  const handleExit =()=>{
    props.setEditFlag(false)
  }
  return (
    <div className='edit-container'>
        <div className="edit-background" onClick={handleExit}>
        </div>
        <div className='edit-input-container'>
          <input 
          type="text"
          required="required"
          className='edit-input' 
          placeholder='Edit'
          autoFocus
          onChange={props.handleInput}/>
          <button 
          className='edit-button'
          onClick={props.handleEditButton}>EDIT</button>
        </div>
    </div>
  )
}
