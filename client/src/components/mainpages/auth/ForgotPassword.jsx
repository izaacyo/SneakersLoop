import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { isEmail } from '../../utils/validation/Validation'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'


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

const initialState = {
    email: '',
    err: '',
    success: ''
}

function ForgotPassword() {
    const [data, setData] = useState(initialState)

    const { email, err, success } = data

    const handleChangeInput = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
    }

    const forgotPassword = async () => {
        if (!isEmail(email))
            return setData({ ...data, err: 'Invalid emails.', success: '' })

        try {
            const res = await axios.post('/user/forgot', { email })

            return setData({ ...data, err: '', success: res.data.msg })
        } catch (err) {
            err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: '' })
        }
    }

    return (
        <div className="fg_pass">
            <Title>Forgot Your Password?</Title>

            <Row>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <label htmlFor="email">Enter your email address</label>
                <Input type="email" name="email" id="email" value={email}
                    onChange={handleChangeInput} />
                <Button onClick={forgotPassword}>Verify your email</Button>
            </Row>
        </div>
    )
}

export default ForgotPassword