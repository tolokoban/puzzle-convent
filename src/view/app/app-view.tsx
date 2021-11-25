import './app-view.css'

import * as React from 'react'

import { Assets, Rooms } from '../../types'
import Convent3DView from '../convent-3d'
import FloorView from '../convent-floor'

export interface AppViewProps {
    className?: string
    assets: Assets
}

export default function AppView(props: AppViewProps) {
    const [roomsFloor1, setRoomsFloor1] = React.useState(makeRandomRooms())
    const [roomsFloor2, setRoomsFloor2] = React.useState(makeRandomRooms())
    const handleRoomFloor1Click = (index: number) => {
        const rooms: Rooms = [...roomsFloor1]
        rooms[index] = 1 + (rooms[index] % 9)
        setRoomsFloor1(rooms)
    }
    const handleRoomFloor2Click = (index: number) => {
        const rooms: Rooms = [...roomsFloor2]
        rooms[index] = 1 + (rooms[index] % 9)
        setRoomsFloor2(rooms)
    }
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
            <div className="fill">
                <Convent3DView
                    roomsFloor1={roomsFloor1}
                    roomsFloor2={roomsFloor2}
                    meshes={props.assets.meshes}
                    compassTexture={props.assets.textures.compass}
                />
                <footer>
                    <div className={ruleN ? 'yes' : 'no'}>N</div>
                    <div className={ruleE ? 'yes' : 'no'}>E</div>
                    <div className={ruleS ? 'yes' : 'no'}>S</div>
                    <div className={ruleW ? 'yes' : 'no'}>W</div>
                    <div className={ruleDouble ? 'yes' : 'no'}>x2</div>
                    <div className={ruleTotal ? 'yes' : 'no'}>∑</div>
                </footer>
            </div>
        </div>
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
    const rooms: Rooms = [0, 0, 0, 0, 0, 0, 0, 0]
    for (let i = 0; i < rooms.length; i++) {
        const value = 1 + Math.floor(Math.random() * 9)
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
    const [a, b, c, d, e, f, g, h] = roomsFloor1
    const [A, B, C, D, E, F, G, H] = roomsFloor2
    return {
        ruleDouble:
            A + B + C + D + E + F + G + H ===
            2 * (a + b + c + d + e + f + g + h),
        ruleN: a + b + c + A + B + C === 11,
        ruleE: c + e + h + C + E + H === 11,
        ruleS: f + g + h + F + G + H === 11,
        ruleW: a + d + f + A + D + F === 11,
        ruleTotal: false,
    }
}
