import React from 'react'

export default function Tasks(props) {

    let tasks=props.tasks

    let style={
        textDecoration: "line-through"
    }

return (
    <>
    {tasks?.map((t)=>
    (<div className='tasks-name-container' key={t.id}>
        <input 
        type="checkbox" 
        id={t.id}
        checked={t.isChecked? true :false}
        onChange={props.handleBox} />
        <p style={t.isChecked?style : null}>{t.name}</p>
            <div className='button-div'>
                <button 
                className='del-button' 
                value={t.name}
                id={t.id}
                onClick={props.handleDel}>🗑️</button>
                <button 
                className='ed-button'
                id={t.id}
                onClick={props.handleEdit}
                >✏️</button>
            </div>
        </div>))}
    </>
)
}