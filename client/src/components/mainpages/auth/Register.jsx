import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { mobile } from '../../../responsive';
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from "../../utils/notification/Notification"
import {isEmpty, isEmail, isLength, isMatch} from "../../utils/validation/Validation"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const linkStyle = {
  margin: "5px 0px",
  fontSize: "12px",
  textDecoration: "underline",
  cursor: "pointer",
}

const initialState = {
  name: '',
  email: '',
  password: '',
  cf_password: '',
  err: '',
  success: ''
}

const Register = () => {
  const [user, setUser] = useState(initialState)

  const {name, email, password,cf_password, err, success} = user

  const handleChangeInput = e => {
    const {name, value} = e.target
    setUser({...user, [name]:value, err: '', success: ''})
}


const handleSubmit = async e => {
  e.preventDefault()
  if(isEmpty(name) || isEmpty(password))
          return setUser({...user, err: "Please fill in all fields.", success: ''})

  if(!isEmail(email))
      return setUser({...user, err: "Invalid email.", success: ''})

  if(isLength(password))
      return setUser({...user, err: "Password must be at least 6 characters.", success: ''})
  
  if(!isMatch(password, cf_password))
      return setUser({...user, err: "Password did not match.", success: ''})

  try {
      const res = await axios.post('/user/register', {
          name, email, password
      })

      setUser({...user, err: '', success: res.data.msg})
      
  } catch (err) {

      err.response.data.msg && 
      setUser({...user, err: err.response.data.msg, success: ''})
  }
}

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>

                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <Form onSubmit={handleSubmit}>
                    <Input type="text" placeholder="Enter your name" id="name"
                    value={name} name="name" onChange={handleChangeInput}/>

                    <Input  type="text" placeholder="Enter email address" id="email"
                    value={email} name="email" onChange={handleChangeInput}/>

                    <Input type="password" placeholder="Enter password" id="password"
                    value={password} name="password" onChange={handleChangeInput}/>

                    <Input type="password" placeholder="Confirm password" id="cf_password"
                    value={cf_password} name="cf_password" onChange={handleChangeInput}/>
                  
                  <Agreement>
                      By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
                  </Agreement>

                  <Button type="submit">CREATE</Button>
                </Form>
                <p>Already an account? <Link style={linkStyle} to="/login">Login</Link></p>

            </Wrapper>
        </Container>
    )
}

export default Register