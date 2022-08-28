import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setAccessToken } from '../accessToken'
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql'

export const Login: React.FC = () => {
    const [email, setemail] = useState("")
    const [password, setPassowrd] = useState("")
    const [login] = useLoginMutation()
    let navigate = useNavigate()
        return <form onSubmit={async e => {
            e.preventDefault()
            const response = await login({
            variables: {
                inputOptions: {email, password}
                },
                update: (store, {data}) => {
                    if (!data) {
                        return null
                    }
                    store.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {
                            me: data.loginUser.user,
                        }
                    })
                    return data.loginUser.user
                }
            })            
            if (response && response.data) {
                setAccessToken(response.data.loginUser.accessToken)
            }
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
            <button type='submit'>Login</button>
        </form>
}