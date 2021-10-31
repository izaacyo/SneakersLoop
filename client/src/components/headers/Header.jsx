import React from 'react'
import styled from 'styled-components'
import {Search} from "@material-ui/icons"
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
font-size:14px;
cursor:pointer;
${mobile({display:"none"})}
`
const SearchContainer = styled.div`
border: 0.5px solid lightgray;
display:flex;
align-items:center;
margin-left:25px;
padding: 5px`

const Input = styled.input`
border:none;
${mobile({width:"50px"})}
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

    const {user, isLogged} = auth 

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

 return  <li className="drop-nav">
 <Link style={linkStyle} to="#" className="avatar">
 <Img src={user.avatar} alt=""/> {user.name} <i className="fas fa-angle-down"></i>
 </Link>
 <ul className="dropdown">
     <li><Link to="/profile">Profile</Link></li>
     <li><Link to="/" onClick={handleLogout} >Logout</Link></li>
 </ul>
</li>
}


const transForm = {
    transform: isLogged ? "translateY(-5px)" : 0
}

return (
    <header>
             <Left>
                 <Language>
                     EN
                 </Language>
                 <SearchContainer>
                     <Input placeholder="Search"/>
                     <Search style={{color:"gray", fontSize:16}}/>
                 </SearchContainer>
             </Left>
             <Center>
                 <Link to="/">
                 <Logo src= {"https://res.cloudinary.com/dn6ulsxxf/image/upload/v1635675650/SneakersLoop/SneakersLoop_fvelwb.png"} alt={"logo"}> 
                 </Logo>
                 </Link>
             </Center>

       <Right>
        <ul style={transForm}>
            <li><Link style={{textDecoration:"none"}} to="/"><i className="fas fa-shopping-cart"></i> Cart</Link></li>
            {
                isLogged
                ? userLink()
                :<li><Link to="/login"><i className="fas fa-user"></i> Sign in</Link></li>
            }
            
        </ul>
        </Right> 
    </header>
)}


export default Navbar