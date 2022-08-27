import React from 'react'
import { useByeQuery } from '../generated/graphql';


export const Bye: React.FC = () => {
    const {data, loading, error} = useByeQuery({
        fetchPolicy: "network-only"
    })
    
    if (loading) {
        return <div>loading...</div>
    }
    if (error){
        return (<div>Error</div>)
    }
    if (!data) {
        return <div>no data</div>
    }
        return (<div>{data.bye}</div>);
}