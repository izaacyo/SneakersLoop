import { Facebook, 
    Instagram,
     MailOutline,
     Phone,
     Pinterest,
     Room,
     Twitter, } from '@material-ui/icons';
 
 import React from 'react'
 import styled from 'styled-components'
 import { mobile } from '../../responsive';
 import { Link } from 'react-router-dom';
 
 const Container = styled.div`
 display: flex;
 ${mobile({flexDirection:"column"})}
 `
 
 const Left = styled.div`
 flex:1;
 display: flex;
   flex-direction: column;
   padding: 20px;
   `
 
 const Logo = styled.h1`
 `
 const Desc = styled.p`
 margin: 20px 0px;
 `
 const SocialContainer = styled.div`
 display: flex;
 `
 const SocialIcon = styled.div`
 width: 40px;
 height: 40px;
 border-radius: 50%;
 color: white;
 background-color: #${(props) => props.color};
 display: flex;
 align-items: center;
 justify-content: center;
 margin-right: 20px;
 `
 
 const Center = styled.div`
 flex: 1;
   padding: 20px;
   ${mobile({display:"none"})}
   `
 const Title = styled.h3`
   margin-bottom: 30px;
 `;
 
 const LinkList = styled.ul`
   margin: 0;
   padding: 0;
   list-style: none;
   display: flex;
   flex-wrap: wrap;
 `;
 
 const styledLink = {
    width: "50%",
    marginBottom: "10px"
 }

 
 
 const Right = styled.div`
 flex: 1;
 padding: 20px;
 ${mobile({ backgroundColor: "#fff8f8" })}
 `
 
 const ContactItem = styled.div`
   margin-bottom: 20px;
   display: flex;
   align-items: center;
 `;
 
 const Payment = styled.img`
     width: 50%;
 `;
 
 const Footer = () => {
     return (
         <Container>
             <Left>
                 <Logo>SneakersLoop</Logo>
                 <Desc>Just another website selling shoes? An old passion for footwear culture? A way to practice what I learned in one year of coding? Why not all? Welcome to SneakersLoop!</Desc>
                 <SocialContainer>
                     <SocialIcon color="3B5999">
                         <Facebook/>
                     </SocialIcon>
                     <SocialIcon color="E4405F">
                         <Instagram/>
                     </SocialIcon>
                     <SocialIcon color="55ACEE">
                         <Twitter/>
                     </SocialIcon>
                     <SocialIcon color="E60023">
                         <Pinterest/>
                     </SocialIcon>
                 </SocialContainer>
             </Left>
             <Center>
             <Title>Useful Links</Title>
               <LinkList>
                <Link to ="/" style={styledLink}>Home</Link>
                <Link to="/cart" style={styledLink}>Cart</Link>
                <Link to = "/" style={styledLink}>Men</Link>
                <Link to = "/" style={styledLink}>Women</Link>
                <Link to = "/" style={styledLink}>Kids</Link>
                <Link to = "/" style={styledLink}>My Account</Link>
                <Link to = "/" style={styledLink}>Order Tracking</Link>
                <Link to = "/" style={styledLink}>Wishlist</Link>
                <Link to = "/" style={styledLink}>Terms</Link>
              </LinkList> 
             </Center>
 
 
         <Right>
             <Title>Contact</Title>
             <ContactItem>
                <Room style={{marginRight:"10px"}}/> Mannerheimintie 12
             </ContactItem>
 
             <ContactItem>
                <Phone style={{marginRight:"10px"}}/> +358 40 610 1375
             </ContactItem>
 
             <ContactItem>
                 <MailOutline style={{marginRight:"10px"}} /> sneakersloop78@gmail.com
             </ContactItem>
 
             <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
          </Right>
         </Container>
     )
 }
 
 export default Footer