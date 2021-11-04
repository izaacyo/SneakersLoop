import React, {useState } from 'react'
import styled from 'styled-components'
import {mobile} from "../../../responsive";
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom';
import { showErrMsg, showSuccessMsg} from "../../utils/notification/Notification"
import {dispatchLogin} from "../../../redux/actions/authActions"
import {GoogleLogin} from "react-google-login"
import FacebookLogin from 'react-facebook-login';



const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top:15rem
  `

  const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 10px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled{
    color:green;
    cursor: not-allowed;
  }
`;

const linkStyle = {
  margin: "5px 0px",
  fontSize: "12px",
  textDecoration: "underline",
  cursor: "pointer",
}


/*const socialStyle = {
  width: "100%",
  margin: "10px 0",
  height: "50px",
  fontSize: "14px",
  fontWeight: "200",
  textTransform: "capitalize",
  letterSpacing: "1.3px",
  boxShadow: "0 2px 4px #777",*/
  /*margin:"5px",
  width: "165px",
  height:"35px",
  borderRadius: "4px",
  background: "#db3236",
  color:"white",
  border: "0px transparent",
  textAlign: "center",*/




const initialState = {
  email: '',
  password: '',
  err: '',
  success: ''
}

const Login = () => {
  const [user, setUser] = useState(initialState)
  const dispatch = useDispatch()
  const history = useHistory()


  const {email, password, err, success} = user


  const handleChangeInput = e => {
    const {name, value} = e.target
    setUser({...user, [name]:value, err: '', success: ''})
}



const loginSubmit = async e => {
  e.preventDefault()
  try {
      const res = await axios.post('/user/login', {email, password})
      setUser({...user, err: '', success: res.data.msg})

      localStorage.setItem('firstLogin', true)

      dispatch(dispatchLogin())
      history.push("/")

  } catch (err) {
      err.response.data.msg && 
      setUser({...user, err: err.response.data.msg, success: ''})
  }
}

/*const loginSubmit = async e =>{
  e.preventDefault()
  try {
      await axios.post('/user/login', {...user})

      localStorage.setItem('firstLogin', true)
      
      window.location.href = "/";
  } catch (err) {
      alert(err.response.data.msg)
  }
}*/



const responseGoogle = async (response) => {
  try {
      const res = await axios.post('/user/google_login', {tokenId: response.tokenId})

      setUser({...user, error:'', success: res.data.msg})
      localStorage.setItem('firstLogin', true)

      dispatch(dispatchLogin())
      history.push('/')
  } catch (err) {
      err.response.data.msg && 
      setUser({...user, err: err.response.data.msg, success: ''})
  }
}

const responseFacebook = async (response) => {
  try {
      const {accessToken, userID} = response
      const res = await axios.post('/user/facebook_login', {accessToken, userID})

      setUser({...user, error:'', success: res.data.msg})
      localStorage.setItem('firstLogin', true)

      dispatch(dispatchLogin())
      history.push('/')
  } catch (err) {
      err.response.data.msg && 
      setUser({...user, err: err.response.data.msg, success: ''})
  }
}


  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>
        
        {success && showSuccessMsg(success)}
        <Form onSubmit={loginSubmit}>
          <Input type="text" 
          id="email"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={handleChangeInput}
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
          <Button type= "submit">
            LOGIN
          </Button>
          <Link style={linkStyle} to="/forgot_password">DO NOT YOU REMEMBER THE PASSWORD?</Link>
        </Form>

        <div className="hr">Or Login With</div>

       <GoogleLogin
        clientId="396272530115-9bn2avrvtlm39dn4pvaursrpre139umk.apps.googleusercontent.com"
        buttonText="Login with google"
        onSuccess={responseGoogle}
        cookiePolicy={'single_host_origin'}
        />
        
        <FacebookLogin
                appId="1048444269323123"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook} 
                />
    
        <p style={{padding: '10px 0'}}>New Customer? <Link to="/register">Register</Link></p>

      </Wrapper>
    </Container>
  );
};

export default Login;