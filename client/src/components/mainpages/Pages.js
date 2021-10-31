import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Products from './products/Products'
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'
import NotFound from '../utils/NotFound/NotFound'

import ForgotPass from '../mainpages/auth/ForgotPassword'
import ResetPass from '../mainpages/auth/ResetPassword'

import Profile from '../mainpages/profile/Profile'
import EditUser from '../mainpages/profile/EditUser'

import Home from '../mainpages/home/Home'

import { useSelector } from 'react-redux'

function Body() {
    const auth = useSelector(state => state.auth)
    const { isLogged, isAdmin } = auth
    return (
        <section>
            <Switch>
                <Route path="/" component={Home} exact />

                <Route path="/" exact component={Products} />
                <Route path="/detail/:id" exact component={DetailProduct} />

                <Route path="/login" component={isLogged ? NotFound : Login} exact />
                <Route path="/register" component={isLogged ? NotFound : Register} exact />

                <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPass} exact />
                <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPass} exact />

                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />

                <Route path="/profile" component={isLogged ? Profile : NotFound} exact />
                <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />

                <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
                <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
                <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />

                <Route path="/history" exact component={isLogged ? OrderHistory : NotFound} />
                <Route path="/history/:id" exact component={isLogged ? OrderDetails : NotFound} />

                <Route path="/cart" exact component={Cart} />


                <Route path="*" exact component={NotFound} />

            </Switch>
        </section>
    )
}

export default Body