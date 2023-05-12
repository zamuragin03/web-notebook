import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import ColorPicker from '../CreateCategory/CreateCategory';

import CatSelector from '../../UI/Selector/CatSelector';
import AuthContext from '../../components/Context/AuthContext';
import { deleteNote, getNote, updateNote } from '../../API/notes/NoteService';

export const NotePage = () => {
    const { user, authTokens } = useContext(AuthContext)
    let { id } = useParams();
    const [note, setNote] = useState(null);
    const [isOwner, setisOwner] = useState(() => false);
    useEffect(() => {
        get_note()
    }, [user, isOwner])

    useEffect(() => {
        update_note()
    }, [note]);

    let get_note = async () => {
        let response = await getNote(authTokens.access, id)
        if (response.status === 200) {
            setisOwner(true)
            setNote(await response.json())
        }
        else {
            setisOwner(false)
        }

    }
    let update_note = async () => {
        if (note != null) {
            await updateNote(authTokens.access, id, note.body)
        }
    }
    function ChangeNote(event) {
        setNote({ ...note, 'body': event.target.value })
        update_note()
    }
    async function delete_note() {
        await deleteNote(authTokens.access, id)
    }


    return (
        <div>
            {user && isOwner ?
                <div>
                    <Link className='backarrow' to={'/notes'}>
                        <h1 >←</h1>
                    </Link>
                    <Link onClick={delete_note} className='delete' to={'/notes'}>
                        <h1 >delete</h1>
                    </Link>
                    <textarea className='change_text_area' defaultValue={note?.body} onChange={(event) => ChangeNote(event)}></textarea>
                    <hr />
                    <CatSelector note_id ={id} note={note} className='color_picker' />
                </div>
                :
                <h2 className='error_field' >sorry you don't have acces</h2>
            }

        </div>
    )
}
