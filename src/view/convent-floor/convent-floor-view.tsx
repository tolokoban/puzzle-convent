import './convent-floor-view.css'

import * as React from 'react'

import { Rooms } from '../../types'

export interface ConventFloorViewProps {
    className?: string
    background: HTMLImageElement
    rooms: Rooms
    onRoomClick(this: void, index: number): void
}

export default function ConventFloorView(props: ConventFloorViewProps) {
    const { rooms, onRoomClick } = props
    const renderRoom = makeRenderRoom(rooms, onRoomClick)
    return (
        <div
            className={getClassNames(props)}
            style={{ backgroundImage: `url(${props.background.src})` }}
        >
            <div>
                {[0, 1, 2, 3].map(renderRoom)}
                <div className="total">{sum(rooms)}</div>
                {[4, 5, 6, 7].map(renderRoom)}
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
    onRoomClick: (this: void, index: number) => void
) {
    return (index: number): JSX.Element => {
        return (
            <div key={`room-${index}`} onClick={() => onRoomClick(index)}>
                {rooms[index]}
            </div>
        )
    }
}

function sum(rooms: Rooms): number {
    return rooms.reduce((total: number, value: number) => total + value, 0)
}
