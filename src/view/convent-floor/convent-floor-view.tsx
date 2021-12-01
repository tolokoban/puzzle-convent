import './convent-floor-view.css'

import * as React from 'react'

import { Rooms } from '../../types'

export interface ConventFloorViewProps {
    className?: string
    background: HTMLImageElement
    rooms: Rooms
    onRoomClick(this: void, roomIndex: number, x: number, y: number): void
}

// eslint-disable-next-line no-magic-numbers
const FIRST_ROOMS = [0, 1, 2, 3]
// eslint-disable-next-line no-magic-numbers
const LAST_ROOMS = [4, 5, 6, 7]

export default function ConventFloorView(props: ConventFloorViewProps) {
    const { rooms, onRoomClick } = props
    const renderRoom = makeRenderRoom(rooms, onRoomClick)
    return (
        <div
            className={getClassNames(props)}
            style={{ backgroundImage: `url(${props.background.src})` }}
        >
            <div>
                {FIRST_ROOMS.map(renderRoom)}
                <div className="total">{sum(rooms)}</div>
                {LAST_ROOMS.map(renderRoom)}
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

function makeRenderRoom(
    rooms: Rooms,
    onRoomClick: (this: void, index: number, x: number, y: number) => void
) {
    return (index: number): JSX.Element => (
        <div
            key={`room-${index}`}
            onClick={(evt) => {
                const { target } = evt
                const { left, top } = getNonStaticCorner(target as HTMLElement)
                onRoomClick(index, evt.clientX + left, evt.clientY + top)
            }}
        >
            {rooms[index]}
        </div>
    )
}

function sum(rooms: Rooms): number {
    return rooms.reduce((total: number, value: number) => total + value, 0)
}

function getNonStaticCorner(source: HTMLElement | null): {
    left: number
    top: number
} {
    let element = source
    while (element && window.getComputedStyle(element).position === 'static') {
        element = element.parentElement
    }
    if (!element) return { left: 0, top: 0 }
    return element.getBoundingClientRect()
}
