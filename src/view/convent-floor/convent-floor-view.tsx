import './convent-floor-view.css'

import * as React from 'react'

export interface ConventFloorViewProps {
    className?: string
    background: HTMLImageElement
}

export default function ConventFloorView(props: ConventFloorViewProps) {
    const a = castDie()
    const b = castDie()
    const c = castDie()
    const d = castDie()
    const e = castDie()
    const f = castDie()
    const g = castDie()
    const h = castDie()
    return (
        <div
            className={getClassNames(props)}
            style={{ backgroundImage: `url(${props.background.src})` }}
        >
            <div>
                <div>{a}</div>
                <div>{b}</div>
                <div>{c}</div>
                <div>{d}</div>
                <div className="total">{a + b + c + d + e + f + g + h}</div>
                <div>{e}</div>
                <div>{f}</div>
                <div>{g}</div>
                <div>{h}</div>
            </div>
        </div>
    )
}

function getClassNames(props: ConventFloorViewProps): string {
    const classNames = ['custom', 'view-ConventFloorView']
    if (typeof props.className === 'string') {
        classNames.push(props.className)
    }

    return classNames.join(' ')
}

function castDie(): number {
    const value = 1 + Math.floor(Math.random() * 9)
    return value
}
