import React from 'react'
import {useParams} from "react-router";
export default function() {
    const params = useParams()
    return <h1>Item {params['id']} Page</h1>
}