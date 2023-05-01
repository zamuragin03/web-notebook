import React, { useState, useEffect } from 'react'
import { Link, } from 'react-router-dom'
import { getCat } from '../../API/Cats/CatsService'

const NoteItem = ({ note }) => {
  let date = new Date(note.updated_at)
  let short_date = date.toLocaleDateString()
  const displayNote = (item) => {
    if (item.length > 100)
      return item.substring(0, 100) + '...';
    return item
  }
  const [color, setcolor] = useState();
  useEffect(() => {
    get_note_cat()
    
  }, []);
  const get_note_cat = async () => {
    let response = await getCat(note.category)
        if (response.status === 200) {
            let data = await response.json()
            setcolor(data.color)
        }
  }

  return (
    <Link className='note_item' to={`/note/${note.id}`} style={{ backgroundColor:color }} >
      <div className='noteContainer'>
        <h3 className='noteBody'>{displayNote(note.body)}</h3>
        <h3 className='noteDate'>{short_date}</h3>
      </div>
    </Link>
  )
}

export default NoteItem