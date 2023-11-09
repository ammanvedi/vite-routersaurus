import React, {useEffect, useMemo} from 'react'

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle<{id: string}>`

    @keyframes fade-in {
        from { opacity: 0; }
    }

    @keyframes fade-out {
        to { opacity: 0; }
    }

    @keyframes slide-from-right {
        from { transform: translateX(30px); }
    }

    @keyframes slide-to-left {
        to { transform: translateX(0px); }
    }
    
    // ::view-transition-old(${props => props.id}) {
    //     animation: 1s cubic-bezier(0.4, 0, 1, 1) both fade-out
    // }
    //
    // ::view-transition-new(${props => props.id}) {
    //     animation-duration: 1s;
    // }
`

export const Heading = ({text}: {text: string}) => {

    const id = text.replace(/[^a-zA-Z]/, '')

    useEffect(() => {
        document.documentElement.animate([
            {
                animation: ''
            }
        ])
    }, [])


    return <>
        <GlobalStyle id={id} />
        <h1 style={{
            viewTransitionName: id
        }}>
            {text}
        </h1>
    </>
}