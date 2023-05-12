import React, { useState, useContext, useEffect } from 'react'
import classes from './Login.module.css'
import CreateButton from '../../UI/CreateButton/CreateButton'
import InputField from '../../UI/InputField/InputField'
import DeleteButton from '../../UI/DeleteButton/DeletteButton'
import AuthContext from '../../components/Context/AuthContext'


const Login = ({ children, visible, setvisible }) => {
    let { loginUser, registerUser, error, isAuthorized } = useContext(AuthContext)
    useEffect(() => {
        if (isAuthorized) {
            setvisible(false)
        }
    }, [isAuthorized]);
    const rootClasses = [classes.Login]
    if (visible) {
        rootClasses.push(classes.active)
    }
    const [loginClasses, setloginClasses] = useState();
    const [registerClasses, setRegisterClasses] = useState(classes.deactivate);
    const [Form, setForm] = useState({ 'username': '', 'password': '' });

    let ChangeTypeLogin = () => {
        setRegisterClasses(classes.deactivate)
        setloginClasses(null)
    }
    let ChangeTypeRegister = () => {
        setloginClasses(classes.deactivate)
        setRegisterClasses(null)
    }
    let Change_Login_Register = () => {
        if (loginClasses == null) {
            ChangeTypeRegister()
            return
        }
        ChangeTypeLogin()

    }

    let login = async () => {
        loginUser(Form.username, Form.password)
    }
    let register = async () => {
        registerUser(Form.username, Form.password)
        if (error == 'OK') {
            setvisible(false)
        }
    }


    return (
        <div className={rootClasses.join(' ')} onClick={() => setvisible(false)}  >
            <div className={classes.LoginContent} onClick={(e) => e.stopPropagation()} >
                {children}
                <h1 className={classes.error_field} >{error ? error : ''}</h1>
                <div className={classes.choose_type}>
                    <div className={classes.inputs} >
                        <InputField type='text' placeholder='Login' onChange={e => setForm({ ...Form, 'username': e.target.value })} ></InputField>
                        <InputField type='password' placeholder='Password' onChange={e => setForm({ ...Form, 'password': e.target.value })} ></InputField>
                    </div>
                    <CreateButton onClick={login} clss={loginClasses}  >Login</CreateButton>
                    <CreateButton onClick={register} clss={registerClasses} >Register</CreateButton>
                </div>
                <DeleteButton clss={classes.switcher} onClick={Change_Login_Register} >switch </DeleteButton>
            </div>

        </div>
    )
}

export default Login