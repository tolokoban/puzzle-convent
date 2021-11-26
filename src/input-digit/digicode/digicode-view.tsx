import './digicode-view.css'

import * as React from 'react'

export interface DigicodeViewProps {
    className?: string
    x: number
    y: number
    onClick(digit: number): void
}

// eslint-disable-next-line no-magic-numbers
const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

/**
 * A 3x3 grid with clickable digits from 1 to 9.
 */
export default function DigicodeView(props: DigicodeViewProps) {
    const refDiv = React.useRef<null | HTMLDivElement>(null)
    React.useEffect(() => {
        const div = refDiv.current
        if (div) {
            const { width, height } = div.getBoundingClientRect()
            const { body } = document
            const x = clamp(props.x - half(width), 0, body.clientWidth - width)
            const y = clamp(
                props.y - half(height),
                0,
                body.clientHeight - height
            )
            div.style.left = `${x}px`
            div.style.top = `${y}px`
            div.style.opacity = '1'
        }
    }, [refDiv, props.x, props.y])
    return (
        <div ref={refDiv} className={getClassNames(props)}>
            {DIGITS.map((digit) => (
                <button key={digit} onClick={() => props.onClick(digit)}>
                    {digit}
                </button>
            ))}
        </div>
    )
}

function getClassNames(props: DigicodeViewProps): string {
    const classNames = ['custom', 'inputDigit-DigicodeView']
    if (typeof props.className === 'string') {
        classNames.push(props.className)
    }

    return classNames.join(' ')
}

function clamp(value: number, min: number, max: number): number {
    if (value < min) return min
    if (value > max) return max
    return value
}
function half(value: number) {
    const HALF = 0.5
    return HALF * value
}
