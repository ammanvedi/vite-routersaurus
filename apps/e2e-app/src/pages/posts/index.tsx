import { routesMap, startViewTransition } from "@routersaurus/dom";
import React from 'react'
import {useNavigate} from "react-router-dom";
import {Heading} from "../../components/Heading";

/**
---
title: Posts
---
 */

export default function Posts() {
    const n = useNavigate()

    return <div style={{marginLeft: 100, marginTop: 300}}>
        {

            routesMap['/posts'].type === 'directory' ?

                routesMap['/posts'].children.map(child =>

                    child.type === 'page' ?

                        (
                            <div key={child.path} onClick={() => {
                                startViewTransition(child.path, () => {
                                    n(child.path)
                                })
                            }}>
                                {/* @ts-ignore TODO support ambient module declaration mergeing */}
                                <Heading text={child.metadata.title} />
                            </div>
                        )
                        : null

                    )
                : null



            }
    </div>

}