import React from 'react'
import {Heading} from "../../components/Heading";

export default function Loader(props) {

    if(props.metadata.index) {
        return <div>Loading Posts Index</div>
    }

    return <>
        <Heading text={props.metadata.title} />
    </>
}