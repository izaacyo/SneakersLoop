import React, {useState, useEffect} from 'react'
import {showSuccessMsg, showErrMsg} from "../../utils/notification/Notification"
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'


const Wrapper = styled.div`
width: 95%;
padding: 20px;
background-color: white;
margin-top:15rem
`;

const linkStyle = { 
    margin: "50px",
    fontSize: "22px",
    textDecoration: "underline",
    cursor: "pointer",
  }



function ActivationEmail() {
    const {activation_token} = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        if(activation_token){
            const activationEmail = async () => {
                try {
                    const res = await axios.post('/user/activation', {activation_token})
                    setSuccess(res.data.msg)
                } catch (err) {
                    err.response.data.msg && setErr(err.response.data.msg)
                }
            }
            activationEmail()
        }
    },[activation_token])

    return (
        <Wrapper>
        <div>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
        </div>
        <div>
        <Link style={linkStyle} to="/">Back to homepage</Link>
        </div>
        </Wrapper>
    )
}

export default ActivationEmail