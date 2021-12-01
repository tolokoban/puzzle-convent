import './app-view.css'

import * as React from 'react'

import { Assets, Rooms } from '../../types'

import Convent3DView from '../convent-3d'
import FloorView from '../convent-floor'
import { inputDigit } from '../../input-digit'
import { useApplicationState } from '../../state'

export interface AppViewProps {
    className?: string
    assets: Assets
}

export default function AppView(props: AppViewProps) {
    const { state, setPeopleInRoomAtFloor1, setPeopleInRoomAtFloor2 } =
        useApplicationState()
    const { ruleN, ruleE, ruleS, ruleW, ruleDouble, ruleTotal } = checkRules(
        state.roomsFloor1,
        state.roomsFloor2,
        state.totalPeople
    )
    return (
        <div className={getClassNames(props)}>
            <FloorView
                rooms={state.roomsFloor1}
                background={props.assets.images.floor}
                onRoomClick={(roomIndex: number, x: number, y: number) =>
                    inputNbPeople(roomIndex, x, y, setPeopleInRoomAtFloor1)
                }
            />
            <FloorView
                rooms={state.roomsFloor2}
                background={props.assets.images.floor}
                onRoomClick={(roomIndex: number, x: number, y: number) =>
                    inputNbPeople(roomIndex, x, y, setPeopleInRoomAtFloor2)
                }
            />
            {renderPreviewPane(
                state.roomsFloor1,
                state.roomsFloor2,
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

function checkRules(
    roomsFloor1: Rooms,
    roomsFloor2: Rooms,
    expectedPeople: number
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
        ruleTotal:
            expectedPeople ===
            a + b + c + d + e + f + g + h + A + B + C + D + E + F + G + H,
    }
}

function double(value: number) {
    return value + value
}

async function inputNbPeople(
    roomIndex: number,
    x: number,
    y: number,
    setPeopleInRoom: (this: void, index: number, numberOfPeople: number) => void
) {
    const numberOfPeople = await inputDigit(x, y)
    setPeopleInRoom(roomIndex, numberOfPeople)
}
