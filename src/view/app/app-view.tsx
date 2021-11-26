import './app-view.css'

import * as React from 'react'

import { Assets, Rooms } from '../../types'

import Convent3DView from '../convent-3d'
import FloorView from '../convent-floor'
import { inputDigit } from '../../input-digit'

export interface AppViewProps {
    className?: string
    assets: Assets
}

export default function AppView(props: AppViewProps) {
    const [roomsFloor1, setRoomsFloor1] = React.useState(makeRandomRooms())
    const [roomsFloor2, setRoomsFloor2] = React.useState(makeRandomRooms())
    const { handleRoomFloor1Click, handleRoomFloor2Click } = makeHandlers(
        roomsFloor1,
        setRoomsFloor1,
        roomsFloor2,
        setRoomsFloor2
    )
    const { ruleN, ruleE, ruleS, ruleW, ruleDouble, ruleTotal } = checkRules(
        roomsFloor1,
        roomsFloor2
    )
    return (
        <div className={getClassNames(props)}>
            <FloorView
                rooms={roomsFloor1}
                background={props.assets.images.floor}
                onRoomClick={handleRoomFloor1Click}
            />
            <FloorView
                rooms={roomsFloor2}
                background={props.assets.images.floor}
                onRoomClick={handleRoomFloor2Click}
            />
            {renderPreviewPane(
                roomsFloor1,
                roomsFloor2,
                props,
                ruleN,
                ruleE,
                ruleS,
                ruleW,
                ruleDouble,
                ruleTotal
            )}
        </div>
    )
}

function makeHandlers(
    roomsFloor1: Rooms,
    setRoomsFloor1: React.Dispatch<React.SetStateAction<Rooms>>,
    roomsFloor2: Rooms,
    setRoomsFloor2: React.Dispatch<React.SetStateAction<Rooms>>
) {
    const handleRoomFloor1Click = async (
        index: number,
        x: number,
        y: number
    ) => {
        const rooms: Rooms = [...roomsFloor1]
        rooms[index] = await inputDigit(x, y)
        setRoomsFloor1(rooms)
    }
    const handleRoomFloor2Click = async (
        index: number,
        x: number,
        y: number
    ) => {
        const rooms: Rooms = [...roomsFloor2]
        rooms[index] = await inputDigit(x, y)
        setRoomsFloor2(rooms)
    }
    return { handleRoomFloor1Click, handleRoomFloor2Click }
}

function renderPreviewPane(
    roomsFloor1: Rooms,
    roomsFloor2: Rooms,
    props: AppViewProps,
    ruleN: boolean,
    ruleE: boolean,
    ruleS: boolean,
    ruleW: boolean,
    ruleDouble: boolean,
    ruleTotal: boolean
) {
    return (
        <div className="fill">
            <Convent3DView
                roomsFloor1={roomsFloor1}
                roomsFloor2={roomsFloor2}
                meshes={props.assets.meshes}
                compassTexture={props.assets.textures.compass}
            />
            {renderFooter(ruleN, ruleE, ruleS, ruleW, ruleDouble, ruleTotal)}
        </div>
    )
}

function renderFooter(
    ruleN: boolean,
    ruleE: boolean,
    ruleS: boolean,
    ruleW: boolean,
    ruleDouble: boolean,
    ruleTotal: boolean
) {
    return (
        <footer>
            <div className={ruleN ? 'yes' : 'no'}>N</div>
            <div className={ruleE ? 'yes' : 'no'}>E</div>
            <div className={ruleS ? 'yes' : 'no'}>S</div>
            <div className={ruleW ? 'yes' : 'no'}>W</div>
            <div className={ruleDouble ? 'yes' : 'no'}>x2</div>
            <div className={ruleTotal ? 'yes' : 'no'}>∑</div>
        </footer>
    )
}

function getClassNames(props: AppViewProps): string {
    const classNames = ['custom', 'view-AppView']
    if (typeof props.className === 'string') {
        classNames.push(props.className)
    }

    return classNames.join(' ')
}

function makeRandomRooms(): Rooms {
    const NB_DIGITS = 9
    const rooms: Rooms = [0, 0, 0, 0, 0, 0, 0, 0]
    for (let i = 0; i < rooms.length; i++) {
        const value = 1 + Math.floor(Math.random() * NB_DIGITS)
        rooms[i] = value
    }
    return rooms
}

function checkRules(
    roomsFloor1: Rooms,
    roomsFloor2: Rooms
): {
    ruleN: boolean
    ruleE: boolean
    ruleS: boolean
    ruleW: boolean
    ruleDouble: boolean
    ruleTotal: boolean
} {
    const SLEEPER_PER_FACE = 11
    const [a, b, c, d, e, f, g, h] = roomsFloor1
    const [A, B, C, D, E, F, G, H] = roomsFloor2
    return {
        ruleDouble:
            A + B + C + D + E + F + G + H ===
            double(a + b + c + d + e + f + g + h),
        ruleN: a + b + c + A + B + C === SLEEPER_PER_FACE,
        ruleE: c + e + h + C + E + H === SLEEPER_PER_FACE,
        ruleS: f + g + h + F + G + H === SLEEPER_PER_FACE,
        ruleW: a + d + f + A + D + F === SLEEPER_PER_FACE,
        ruleTotal: false,
    }
}

function double(value: number) {
    return value + value
}
