import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import CreateButton from '../../UI/CreateButton/CreateButton';
import { useFetching } from '../../components/hooks/useFetchingNotes';
import CatsService from '../../API/Cats/CatsService';
import AuthContext from '../../components/Context/AuthContext';


export const AddPage = () => {
    const [note, setNote] = useState(null);
    let { authTokens, userId } = useContext(AuthContext)
    const navigate = useNavigate();
    const [cats, setcats] = useState([]);
    const [selectedCat, setselectedCat] = useState();
    function ChangeNote(event) {
        setNote({ ...note, 'body': event.target.value })
    }
    useEffect(() => {
        fetchCats()
    }, []);
    const [fetchCats,] = useFetching(async () => {
        let cats = await CatsService.get_all_cats()
        setcats(cats)
    })
    async function Add_Note() {
        console.log(userId);
        let el = cats.find(e => e.name == selectedCat)
        let cat_id = el.id
        
        if (note.body == '') {
            return
        }
        if (selectedCat == null) {
            return
        }
        let response = await fetch(`/api/create_note/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`
            },
            body: JSON.stringify({
                'body': note.body,
                'category': cat_id,
                'user': userId,
            })
        })
        if (response.status === 201) {
            navigate('/notes')
        }

        document.getElementsByName('note_body')[0].placeholder = "shouldn't be empty";

    }
    return (
        <div>
            <textarea name='note_body' className='change_text_area' placeholder='type your note here' onChange={(event) => ChangeNote(event)} ></textarea>
            <select className='color_picker' defaultValue={note?.body} onChange={(e) => setselectedCat(e.target.value)}>
                {cats.map(cat =>
                    <option key={cat.id} value={cat.name} >
                        {cat.name}
                    </option>
                )}
            </select>
            <CreateButton className='add_note' onClick={Add_Note} >
                create
            </CreateButton>
        </div>
    )
}

export default AddPage