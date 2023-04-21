import React, { useState, useEffect } from 'react'
import NoteItem from './NoteItem';
import { Link, useNavigate } from 'react-router-dom'
import CreateButton from '../../UI/CreateButton/CreateButton';
import NoteService from '../../API/notes/NoteService';
import { useFetching } from '../../components/hooks/useFetchingNotes';

export const NotesList = () => {
    const [notes, setNotes] = useState([
    ]);;
    useEffect(() => {
        fetchNotes()
    }, []);
    const navigate = useNavigate();
    const [fetchNotes, isLoading, error] = useFetching(async () =>{
        let notes = await NoteService.get_all_notes()
        setNotes(notes)
    })
    let CreateNote = () => {
        navigate('/create_note')
    }
    return (
        <div className='note_list' >
            <h2 className='NotesTitle' >notes</h2>
            <CreateButton className='add_from_list' onClick={CreateNote}>
                create new note
            </CreateButton>
            {error &&
            <h2>Ошибка {error}</h2>
            }
            {isLoading ? <h1>loading...</h1> :
                <div>
                    {
                        notes.map(note => (
                            <NoteItem className='NoteItem' key={note.id} note={note} />
                        ))
                    }
                </div>
            }
        </div>
    )
}