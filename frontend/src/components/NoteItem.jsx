import React from 'react'
import { Link } from 'react-router-dom'

const NoteItem = ({ note }) => {
  let date = new Date(note.updated_at)
  let short_date = date.toLocaleDateString()
  const displayNote =(item) =>{
    if (item.length >100)
        return item.substring(0, 100)+ '...';
    return item
}
  return (
    <Link className='note_item' to={`/note/${note.id}`}>
      <div className='noteContainer'>
        <h3 className='noteBody'>{displayNote(note.body)}</h3>
        <h3 className='noteDate'>{short_date}</h3>
      </div>
    </Link>
  )
}

export default NoteItem