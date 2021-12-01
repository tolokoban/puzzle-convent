import './convent-3d-view.css'

import * as React from 'react'

import { Meshes, useCanvas3D } from './convent-3d-hooks'

import { Rooms } from '../../types'
import { Texture as ThreeTexture } from 'three'

export interface Convent3dViewProps {
    className?: string
    roomsFloor1: Rooms
    roomsFloor2: Rooms
    meshes: Meshes
    compassTexture: ThreeTexture
}

export default function Convent3dView(props: Convent3dViewProps) {
    const refCanvas = React.useRef<HTMLCanvasElement | null>(null)
    useCanvas3D(
        refCanvas,
        props.roomsFloor1,
        props.roomsFloor2,
        props.meshes,
        props.compassTexture
    )
    return <canvas className={getClassNames(props)} ref={refCanvas}></canvas>
}

function getClassNames(props: Convent3dViewProps): string {
    const classNames = ['custom', 'view-Convent3dView']
    if (typeof props.className === 'string') {
        classNames.push(props.className)
    }

    return classNames.join(' ')
}
