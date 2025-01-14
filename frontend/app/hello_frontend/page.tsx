'use client'

import axious from 'axios'
import { useEffect, useState } from 'react'

export default function Page(){
    const [data, setData] = useState({ name: ''})
    
    useEffect(() => {
        axious.get('/api/hello')
        .then((res) => res.data)
        .then((data) => {
            setData(data)
        })
    }, [])
    return <div>hello {data.name}!</div>
}
