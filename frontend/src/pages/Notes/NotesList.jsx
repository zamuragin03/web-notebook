import React, { useState, useEffect } from 'react'
import NoteItem from '../../components/NoteItem';
import { Link } from 'react-router-dom'

export const NotesList = () => {
    const [notes, setNotes] = useState([
    ]);

    useEffect(() => {
        getNotes()
    }, []);

    let getNotes = async () => {

        let response = await fetch('api/get_notes')
        let data = await response.json()
        setNotes(data)
    }
    return (
        <div className='note_list' >
            <h2 className='NotesTitle' >notes</h2>
            <Link className='add_from_list' to={'/create_note'} >
                add new note
            </Link>
            {notes.map(note => (
                <NoteItem className='NoteItem' key={note.id} note={note} />
            ))}
        </div>
    )
}