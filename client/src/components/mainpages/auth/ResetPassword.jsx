import React, {useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {useParams, Link} from 'react-router-dom'
import {isLength, isMatch} from '../../utils/validation/Validation'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'


const Title = styled.h2`
color: #555;
text-transform: uppercase;
text-align: center;
font-size: 2rem;
margin: 50px 0;
letter-spacing: 1.3px;
`
const Row = styled.div`
max-width: 500px;
margin: auto;
padding: 0 10px;
`
const Input = styled.input`
width: 100%;
height: 25px;
border: 1px solid #ccc;
outline: none;
padding: 0 15px;
border-radius: 3px;
margin: 5px 0;
`
const Button = styled.button`
background: #333;
color: white;
padding: 10px 30px;
text-transform: uppercase;
letter-spacing: 1.3px;
border-radius: 3px;
margin-top: 15px;
`

const linkStyle = {
    margin: "20px",
    fontSize: "15px",
    textDecoration: "underline",
    cursor: "pointer",
  }

const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function ResetPassword() {
    const [data, setData] = useState(initialState)
    const {token} = useParams()

    const {password, cf_password, err, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }


    const handleResetPass = async () => {
        if(isLength(password))
            return setData({...data, err: "Password must be at least 6 characters.", success: ''})

        if(!isMatch(password, cf_password))
            return setData({...data, err: "Password did not match.", success: ''})
        
        try {
            const res = await axios.post('/user/reset', {password}, {
                headers: {Authorization: token}
            })

            return setData({...data, err: "", success: res.data.msg})

        } catch (err) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }
        
    }


    return (
        <div className="fg_pass">
            <Title>Reset Your Password</Title>

            <Row>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <label htmlFor="password">Password</label>
                <Input type="password" name="password" id="password" value={password}
                onChange={handleChangeInput} />

                <label htmlFor="cf_password">Confirm Password</label>
                <Input type="password" name="cf_password" id="cf_password" value={cf_password}
                onChange={handleChangeInput} />         

                <Button onClick={handleResetPass}>Reset Password</Button>
                <Link style={linkStyle} to="/login">Back to login page</Link>
            </Row>
        </div>
    )
}

export default ResetPassword