import { createContext, useState, useEffect, } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext()
export default AuthContext

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')).username : null)
    const [authTokens, setauthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [userId, setuserId] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')).user_id : null);
    useEffect(() => {
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, 270000);
        return () => clearInterval(interval)

    }, [authTokens]);

    let loginUser = async (username, password) => {
        let response = await fetch(`/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': username, 'password': password })
        })
        let data = await response.json()
        if (response.status === 200) {
            setauthTokens(data)
            setUser(jwt_decode(data.access).username)
            setuserId(jwt_decode(data.access).user_id)
            localStorage.setItem('authTokens', JSON.stringify(data))

        }
        else {
            alert('bad data')
        }
    }
    let logoutUser = () => {
        setauthTokens(null)
        setUser(null)
        setuserId(null)
        localStorage.removeItem('authTokens')

    }
    let updateToken = async () => {
        console.log('token updated');
        let response = await fetch(`/api/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': authTokens.refresh })
        })
        let data = await response.json()
        if (response.status === 200) {
            setauthTokens(data)
            setUser(jwt_decode(data.access).username)
            localStorage.setItem('authTokens', JSON.stringify(data))
        }
        else {
            logoutUser()
        }
    }
    let registerUser = async (username, password) => {
        // console.log(username);
        // console.log(password);
        let response = await fetch(`api/drf-auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': username, 'password': password })
        })
    }


    let contextData = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser,
        authTokens: authTokens,
        registerUser:registerUser,
        userId:userId,
        updateToken: updateToken
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}