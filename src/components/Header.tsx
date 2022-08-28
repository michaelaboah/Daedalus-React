import React from 'react'
import { Link } from 'react-router-dom';
import { setAccessToken } from '../accessToken';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = ({}) => {
    const {data, loading, client} = useMeQuery()
    const [logout] = useLogoutMutation()
    let body: any = null

    if (loading) {
        body = null
    } else if (data && data.me) {
        body =  <div> User: {data.me.email} </div>
    } else {
        body = <div> not logged in</div>
    }
    return (
        <header>
            <div>
                <Link to={"/"}>Home</Link>
            </div>
            <div>
                <Link to={"/register"}>Register</Link>
            </div>
            <div>
                <Link to={"/login"}>Login</Link>
            </div>
            <div>
                <Link to={"/bye"}>Bye</Link>
            </div>
            <div>
                {! loading && data && data.me ? 
                    <button 
                    onClick={ async()=> {
                            await logout();
                            setAccessToken("")
                            await client!.resetStore()
                        }
                    }
                    >Logout</button> 
                : 
                null}
            </div>
            {body}
        </header>
    );
}