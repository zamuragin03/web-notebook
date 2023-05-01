
import React, { useEffect, useState, useContext } from 'react'
import { useFetching } from '../../components/hooks/useFetchingNotes';

import AuthContext from '../../components/Context/AuthContext';
import { getCat, get_all_cats } from '../../API/Cats/CatsService';
import { updateNote } from '../../API/notes/NoteService';

const CatSelector = ({ note, value, defaultValue, ...props }) => {
    const { user, authTokens } = useContext(AuthContext)

    const [selectedCat, setselectedCat] = useState('');
    const [cats, setCats] = useState([]);
    const [fetchCats, isLoading, error] = useFetching(async () => {
        let fetched_cats = await get_all_cats()
        setCats(fetched_cats)
    })
    const fetch_cat = async () => {
        if (note == null) return
        let response = await getCat(note.category)
        if (response.status === 200) {
            let data = await response.json()
            setselectedCat(data)
        }
    }
    useEffect(() => {
        fetch_cat()
        if (note != null) {
            fetchCats()
        }
    }, [note,])
    useEffect(() => {
        update_cat()

    }, [selectedCat])


    function ChangeCat(value) {
        cats.forEach(element => {
            if (element.name == value) {
                setselectedCat(element)
                return
            }
        });
    }

    let update_cat = async () => {
        if (note == null) return
        await updateNote(authTokens.access, note.id, selectedCat.id)
    }
    return (
        <select {...props} defaultValue={selectedCat.name} value={selectedCat.name} onChange={(e) => ChangeCat(e.target.value)}>
            {cats.map(cat =>
                <option key={cat.id} value={cat.name} >
                    {cat.name}
                </option>
            )}
        </select>

    )
}

export default CatSelector