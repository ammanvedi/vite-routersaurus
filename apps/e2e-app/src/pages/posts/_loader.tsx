import React from 'react'
import {Heading} from "../../components/Heading";

export default function Loader(props) {

    if(!props.metadata) {
        return <h1>Loading Posts Index</h1>
    }

    return <>
        <Heading text={props.metadata.title} />
    </>
}