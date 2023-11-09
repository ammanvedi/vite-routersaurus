// @ts-ignore todo fix this
import { routesMap, startViewTransition } from "@routersaurus/dom";
import React from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {flushSync} from "react-dom";
import {Heading} from "../../components/Heading";

/**
---
title: Posts
---
 */
export default function Posts() {
    const n = useNavigate()
    return <div style={{marginLeft: 100, marginTop: 300}}>
        {routesMap['/posts'].children.map(child => (
            <div key={child.path} onClick={() => {
                startViewTransition(child.path, () => n(child.path))
       }}>
                <Heading text={child.metadata.title} />
            </div>
        ))}
    </div>

}