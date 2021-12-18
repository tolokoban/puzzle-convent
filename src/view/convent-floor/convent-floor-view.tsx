import "./convent-floor-view.css"

import * as React from "react"

import { Rooms } from "../../types"

import RoomView from "./room"

export interface ConventFloorViewProps {
    className?: string
    background: HTMLImageElement
    rooms: Rooms
    onMove(this: void, from: number, to: number): void
}

// eslint-disable-next-line no-magic-numbers
const FIRST_ROOMS = [0, 1, 2, 3]
// eslint-disable-next-line no-magic-numbers
const LAST_ROOMS = [4, 5, 6, 7]

export default function ConventFloorView(props: ConventFloorViewProps) {
    const { rooms, onMove } = props
    return (
        <div
            className={getClassNames(props)}
            style={{ backgroundImage: `url(${props.background.src})` }}
        >
            <div>
                {FIRST_ROOMS.map(index => (
                    <RoomView
                        index={index}
                        value={rooms[index]}
                        onMove={onMove}
                    />
                ))}
                <div> </div>
                {LAST_ROOMS.map(index => (
                    <RoomView
                        index={index}
                        value={rooms[index]}
                        onMove={onMove}
                    />
                ))}
            </div>
        </div>
    )
}

function getClassNames(props: ConventFloorViewProps): string {
    const classNames = ["custom", "view-ConventFloorView"]
    if (typeof props.className === "string") {
        classNames.push(props.className)
    }

    return classNames.join(" ")
}
