import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';

import classes from './CreateCategory.module.css'
import CreateButton from '../../UI/CreateButton/CreateButton';
import ColorPicker from '../../UI/ColorPicker/ColorPicker';
import InputField from '../../UI/InputField/InputField';
import validateCat from './ValidateCategory'
import AuthContext from '../../components/Context/AuthContext';

const CreateCategory = ({ children, onChange, ...props }) => {
    let { user, authTokens, userId } = useContext(AuthContext)

    const [category, setCategory] = useState({ 'color': null, 'name': null });
    const [error, setError] = useState();
    const navigate = useNavigate();

    const Create_Category = async () => {
        let isValid = validateCat(category)
        if (isValid) {
            setError(isValid)
            console.log('s');
            return
        }
        console.log(category)
        let response = await fetch(`/api/create_cat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`

            },
            body: JSON.stringify(category)
        })
        if (response.status === 201) {
            navigate('/notes')
        }
    }
    return (
        <div>
            {user ?
                <div>
                    <h1 className={classes.error_field} >
                        {error ? error : ''}
                    </h1>
                    <ColorPicker onChange={e => setCategory({ ...category, 'color': e.target.value })} />
                    <InputField name='note-cat' clss={[classes.cat_input]} placeholder='Category name' onChange={e => setCategory({ ...category, 'name': e.target.value })}></InputField>

                    <CreateButton onClick={Create_Category}>Create category</CreateButton>
                </div>
                :
                <h1>please authorize</h1>
                }

        </div>
    )
}

export default CreateCategory