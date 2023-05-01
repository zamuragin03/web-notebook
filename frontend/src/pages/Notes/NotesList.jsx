import React, { useState, useEffect, useContext } from 'react'
import NoteItem from './NoteItem';
import { Link, useNavigate } from 'react-router-dom'
import CreateButton from '../../UI/CreateButton/CreateButton';
import { useFetching } from '../../components/hooks/useFetchingNotes';
import AuthContext from '../../components/Context/AuthContext';
import { GetAllNotes } from '../../API/notes/NoteService';

export const NotesList = () => {
    const { user, authTokens, updateToken, isAuthorized } = useContext(AuthContext)

    const [notes, setNotes] = useState([])
    useEffect(() => {
        fetchNotes()
        updateToken()

    }, [user, isAuthorized]);
    const navigate = useNavigate();
    const [fetchNotes, isLoading] = useFetching(async () => {
        if (!user) {
            return
        }
        let response = await GetAllNotes(authTokens.access)
        const notes = await response.json()
        let sorted_note = notes.sort(function (b, a) {
            return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
        });
        setNotes(sorted_note)
    })
    let CreateNote = () => {
        navigate('/create_note')
    }
    return (
        <div className='note_list' >
            <h2 className='NotesTitle' >notes</h2>
            {isAuthorized ?
                <div>
                    <CreateButton className='add_from_list' onClick={CreateNote}>
                        create new note
                    </CreateButton>
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
                :
                <h1>please authorize</h1>
            }

        </div>
    )
}