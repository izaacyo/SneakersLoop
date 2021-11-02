import React, { useState} from 'react'

import styled from 'styled-components'
import {useSelector} from "react-redux"
import { Link } from 'react-router-dom';
import {mobile} from "../../responsive"
import axios from 'axios';
import "./Header.css"


const Left = styled.div`
flex: 1;
display: flex;
align-items: center`; 

const Language = styled.span`
margin:30px;
font-size:14px;
cursor:pointer;
${mobile({display:"none"})}
`

const Center = styled.div`
flex: 1;
margin-top: 35px;
text-align:center
`;

const Logo = styled.img`
width : 300px;
${mobile({width:"100px", padding:"10px"})}
`

const Right = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: flex-end;
${mobile({ flex:2, justifyContent:"center" })}
`;


const Img = styled.img`
    width: 40px;
    height: 40px;
    transform: translateY(10px);
    border-radius: 50%;
` 


const linkStyle = {
    textTransform: "uppercase",
    overflow: "hidden", 
    textDecoration: "none", 
    letterSpacing:"1.5px"
  }

const Navbar = () => {

    const auth = useSelector( state => state.auth)

    const {user, isLogged, isAdmin} = auth 

    const [menu, setMenu] = useState(false)

const handleLogout = async () =>  {

    try {
        await axios.get('/user/logout')
        localStorage.removeItem('firstLogin')
        window.location.href = "/"

    } catch (error) {
        window.location.href = "/"
        
    }
}

const userLink = () => {
    return <>
     <li className="drop-nav">
              <Link style={linkStyle} to="#" className="avatar">
                 <Img src={user.avatar} alt=""/> {user.name} <i className="fas fa-angle-down"></i>
              </Link>
               <ul className="dropdown">
                 <li><Link to="/profile">Profile</Link></li>
                 <li><Link to="/history">History</Link></li>
                  <li><Link to="/" onClick={handleLogout} >Logout</Link></li>
                   </ul>
               </li>
               <Link style={{textDecoration:"none", margin:"50px"}} to="/cart"><i className="fas fa-shopping-cart">
               </i></Link> 
               </>
}

const adminRouter = () =>{
    return(
        <>
            <li><Link to="/create_product">Create Product</Link></li>
            <li><Link to="/category">Categories</Link></li>
        </>
    )
}


/*const transForm = {
    transform: isLogged ? "translateY(-5px)" : 0
}*/

const styleMenu = {
    left: menu ? 0 : "-100%"
}

return (
    <header>
             <Left>
                 <Language>
                     EN
                 </Language>
                 <Link to="/products">{isAdmin ? 'Products' : 'Shop'}</Link>

             </Left>
             <Center>
                 <Link to="/">
                 <Logo src= {"https://res.cloudinary.com/dn6ulsxxf/image/upload/v1635675650/SneakersLoop/SneakersLoop_fvelwb.png"} alt={"logo"}> 
                 </Logo>
                 </Link>
             </Center>
             
<Right>
             <ul style={styleMenu}>

                {isAdmin && adminRouter()}

                {
                    isLogged ? userLink() :
                    <li><Link to="/login"><i className="fas fa-user"></i> Sign in</Link></li>
                }

            </ul>

            {
                isLogged ? '' 
                :<div className="cart-icon">
                    <Link style={{textDecoration:"none"}} to="/cart"><i className="fas fa-shopping-cart">
                             </i></Link>
                </div>
            }
            </Right>
    </header>
)}


export default Navbar