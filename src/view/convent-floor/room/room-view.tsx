import * as React from "react"

import "./room-view.css"

import SwipeGesture, { SwipeEvent } from "../../../gestures/swipe"

export interface RoomViewProps {
    className?: string
    index: number
    value: number
    /** Move one prisoner from room `from` to room `to`. */
    onMove(this: void, from: number, to: number): void
}

const UP = 0
const RIGHT = 1
const DOWN = 2
const LEFT = 3

const TARGETS = [
    [null, 1, 3, null],
    [null, 2, null, 0],
    [null, null, 4, 1],
    [0, null, 5, null],
    [2, null, 7, null],
    [3, 6, null, null],
    [null, 7, null, 5],
    [4, null, null, 6],
]

export default function RoomView(props: RoomViewProps) {
    const ref = React.useRef<null | HTMLDivElement>(null)
    const hoverClassName = useGestures(ref, props)
    const [canGoUp, canGoRight, canGoDown, canGoLeft] = TARGETS[
        props.index
    ].map(v => typeof v === "number")
    return (
        <div
            ref={ref}
            className={`${getClassNames(props)} ${hoverClassName}`}
            key={`room-${props.index}`}
            tabIndex={1}
        >
            <div className="directions">
                {canGoUp && renderArrow("up")}
                {canGoRight && renderArrow("right")}
                {canGoDown && renderArrow("down")}
                {canGoLeft && renderArrow("left")}
            </div>
            <div>{props.value}</div>
        </div>
    )
}

function renderArrow(type: string) {
    return (
        <svg className={type} viewBox="0 0 24 24">
            <path
                fill="currentColor"
                stroke="#000"
                strokeWidth={2}
                d="M1,21H23L12,2Z"
            />
        </svg>
    )
}

function useGestures(
    ref: React.MutableRefObject<HTMLDivElement | null>,
    props: RoomViewProps
) {
    const [hoverClassName, setHoverClassName] = React.useState("")
    React.useEffect(() => {
        const div = ref.current
        if (!div) return

        const behavior = new SwipeGesture(div, {
            onStart() {
                setHoverClassName("hover")
            },
            onSwipe(evt) {
                setHoverClassName("")
                if (props.value <= 1) return

                const dir = getDirection(evt)
                const target = TARGETS[props.index][dir]
                if (typeof target === "number") {
                    props.onMove(props.index, target)
                }
            },
        })
        // eslint-disable-next-line consistent-return
        return () => {
            behavior.detach()
        }
    }, [ref])
    return hoverClassName
}

function getClassNames(props: RoomViewProps): string {
    const classNames = ["custom", "view-conventFloor-RoomView"]
    if (typeof props.className === "string") {
        classNames.push(props.className)
    }

    return classNames.join(" ")
}

function getDirection(evt: SwipeEvent) {
    const { deltaX, deltaY } = evt
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe.
        if (deltaX > 0) return RIGHT
        return LEFT
    }
    // Vertical swipe.
    if (deltaY > 0) return DOWN
    return UP
}
