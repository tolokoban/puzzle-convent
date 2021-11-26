import './input-digit.css'

import Digicode from './digicode'
import React from 'react'
import ReactDOM from 'react-dom'

export async function inputDigit(x: number, y: number): Promise<number> {
    return new Promise<number>((resolve) => {
        const screen = document.createElement('div')
        screen.classList.add('inputDigit')
        document.body.appendChild(screen)
        window.setTimeout(() => screen.classList.add('darken'))
        ReactDOM.render(
            <Digicode
                x={x}
                y={y}
                onClick={(digit: number) => {
                    document.body.removeChild(screen)
                    resolve(digit)
                }}
            />,
            screen
        )
    })
}
