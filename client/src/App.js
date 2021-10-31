import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchLogin, fetchUser, dispatchGetUser } from './redux/actions/authActions'
import Navbar from './components/headers/Header';

import Body from './components/mainpages/Pages'
import axios from 'axios';
import Footer from './components/Footer/Footer';

function App() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.token)
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        if (firstLogin) {
            const getToken = async () => {
                const res = await axios.post('/user/refresh_token', null)
                dispatch({ type: 'GET_TOKEN', payload: res.data.access_token })
            }
            getToken()
        }
    }, [auth.isLogged, dispatch])

    useEffect(() => {
        if (token) {
            const getUser = () => {
                dispatch(dispatchLogin())

                return fetchUser(token).then(res => {
                    dispatch(dispatchGetUser(res))
                })
            }
            getUser()
        }
    }, [token, dispatch])


    return (
        <Router>
            <div className="App">
                <Navbar />
                <Body />
                <Footer />
            </div>
        </Router>
    );
}

export default App;