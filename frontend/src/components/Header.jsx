import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import ListElement from '../UI/ListElement/ListElement';
import DeleteButton from '../UI/DeleteButton/DeletteButton';
import Login from '../pages/Login/Login';
import CreateButton from '../UI/CreateButton/CreateButton';
import AuthContext from './Context/AuthContext';

export default function Header() {
    const { user, logoutUser } = useContext(AuthContext)
    const [login, setLogin] = useState(false);
    function change_color() {
        var el = document.querySelector('*');
        if (el.style['filter'] == 'invert(1)') {
            el.style = 'filter:invert(0)'
        }
        else
            el.style = 'filter:invert(1)'
    }

    return (
        <header>
            <div>
                <Login visible={login} setvisible={setLogin} ></Login>
                <Link className='logotype' to={'/about'} />
                <span className='logo'>Note web service</span>
                <ul className='nav'>
                    <ListElement link={'/about'} >About</ListElement>
                    <ListElement link={'/birthdays'} >Check birthdays</ListElement>
                    {user ?

                        <ListElement link={'/notes'} >Check my notes</ListElement>
                        : null
                    }
                    {user ?

                        <ListElement link={'/create_category'} >Create Category</ListElement>
                        : null
                    }
                    {user ?
                        <ListElement onClick={logoutUser}  >Logout</ListElement>
                        :
                        <ListElement onClick={() => setLogin(true)} >Login</ListElement>
                    }
                    {user &&
                        <li >
                            {user}
                        </li>
                    }
                </ul>
            </div>
            <DeleteButton onClick={change_color} >
                switch the light
            </DeleteButton>

            <div className='presentation'>

            </div>

        </header>
    )
}
