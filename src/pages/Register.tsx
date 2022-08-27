import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../generated/graphql'

export const Register: React.FC = () => {
    const [email, setemail] = useState("")
    const [password, setPassowrd] = useState("")
    const [register] = useRegisterMutation()
    let navigate = useNavigate()
        return <form onSubmit={async e => {
            e.preventDefault()
            console.log('form submitted')
            const response = await register({
            variables: {
                inputOptions: {email, password}
                }
            })
            console.log(response)
            navigate("/")
        }}>
            {/* 
                email 
            */}
            <div>
                <input 
                value={email} 
                placeholder="email" 
                onChange={e => {
                    setemail(e.target.value)
                }}/>
            </div>
            {/* 
                Password
            */}
            <div>
                <input 
                value={password} 
                type="password"
                placeholder="password" 
                onChange={e => {
                    setPassowrd(e.target.value)
                }}/>
            </div>
            <button type='submit'>Register</button>
        </form>
}