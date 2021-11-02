import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchLogin, fetchUser, dispatchGetUser } from './redux/actions/authActions'
import Navbar from './components/headers/Header';

import Body from './components/mainpages/Pages'
import axios from 'axios';
import Footer from './components/Footer/Footer';

import { DataProvider } from './GlobalState'


function App() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.token)
    const auth = useSelector(state => state.auth)
    console.log(auth)

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        if (firstLogin) {
            const getToken = async () => {
                const res = await axios.get('/user/refresh_token')
                dispatch({ type: 'GET_TOKEN', payload: res.data.accesstoken })
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
        <DataProvider>
            <Router>
                <div className="App">
                    <Navbar />
                    <Body />
                    <Footer />
                </div>
            </Router>
        </DataProvider>

    );
}

export default App;