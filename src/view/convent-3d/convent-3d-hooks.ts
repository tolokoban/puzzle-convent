import { useEffect, useRef } from 'react'
import {
    AmbientLight as ThreeAmbientLight,
    CanvasTexture as ThreeCanvasTexture,
    Color as ThreeColor,
    DirectionalLight as ThreeDirectionalLight,
    Group as ThreeGroup,
    Mesh as ThreeMesh,
    MeshPhongMaterial as ThreeMeshPhongMaterial,
    PerspectiveCamera as ThreePerspectiveCamera,
    PlaneGeometry as ThreePlaneGeometry,
    Scene as ThreeScene,
    Texture as ThreeTexture,
    WebGLRenderer as ThreeWebGLRenderer,
} from 'three'

import SwipeGesture, { PanEvent, SwipeEvent } from '../../gestures/swipe'
import { Rooms } from '../../types'
import RotationManager from './rotation-manager'

export interface Meshes {
    convent: ThreeGroup
}

const EMPTY_FUNCTION = (time: number) => {
    /* Empty function. */
}

export function useCanvas3D(
    refCanvas: React.MutableRefObject<HTMLCanvasElement | null>,
    roomsFloor1: Rooms,
    roomsFloor2: Rooms,
    meshes: Meshes,
    compassTexture: ThreeTexture
) {
    const refPaint = useRef(EMPTY_FUNCTION)
    const refUpdateTotals = useRef(
        (totalN: number, totalE: number, totalS: number, totalW: number) => {}
    )
    const [a, b, c, d, e, f, g, h] = roomsFloor1
    const [A, B, C, D, E, F, G, H] = roomsFloor2
    const totalN = a + b + c + A + B + C
    const totalE = c + e + h + C + E + H
    const totalS = f + g + h + F + G + H
    const totalW = a + d + f + A + D + F
    useEffect(() => {
        const canvas = refCanvas.current
        if (!canvas) return

        const { paint, updateTotals } = initScene(
            canvas,
            meshes,
            compassTexture
        )
        refUpdateTotals.current = updateTotals
        const rotationManager = new RotationManager(paint)
        const behavior = new SwipeGesture(
            canvas,
            rotationManager.handleStart,
            rotationManager.handlePan,
            rotationManager.handleSwipe
        )
        return () => behavior.detach()
    }, [refCanvas])
    useEffect(() => {
        refUpdateTotals.current(totalN, totalE, totalS, totalW)
    }, [refUpdateTotals, totalN, totalE, totalS, totalW])
}

function initScene(
    canvas: HTMLCanvasElement,
    meshes: Meshes,
    compassTexture: ThreeTexture
) {
    const renderer = new ThreeWebGLRenderer({ canvas })
    const aspect = canvas.width / canvas.height
    const camera = new ThreePerspectiveCamera(45, aspect, 0.1, 100)
    camera.position.set(2, 3, 5)
    camera.lookAt(0, 0, 0)
    const ambientLight = new ThreeAmbientLight(0xddeeff, 1)
    const directionalLight = new ThreeDirectionalLight(0xffffff, 1)
    directionalLight.position.set(-1, 5, 5)
    directionalLight.target.position.set(0, 0, 0)
    const scene = new ThreeScene()
    scene.background = new ThreeColor('#def')
    const root = new ThreeGroup()

    const textureN = makeFaceTexture(0)
    const faceN = makeFace(0, textureN)
    const textureE = makeFaceTexture(1)
    const faceE = makeFace(1, textureE)
    const textureS = makeFaceTexture(2)
    const faceS = makeFace(2, textureS)
    const textureW = makeFaceTexture(3)
    const faceW = makeFace(3, textureW)
    faceW.material.map = makeFaceTexture(666)
    root.add(
        meshes.convent,
        makeCompassMesh(compassTexture),
        faceN,
        faceE,
        faceS,
        faceW
    )
    scene.add(root, ambientLight, directionalLight)

    let width = 0
    let height = 0
    let lastAngle = 0
    const paint = (newAngle?: number) => {
        const angle = newAngle ?? lastAngle
        lastAngle = angle
        if (canvas.clientWidth !== width || canvas.clientHeight !== height) {
            width = canvas.clientWidth
            height = canvas.clientHeight
            canvas.width = width
            canvas.height = height
            camera.aspect = width / height
            camera.updateProjectionMatrix()
            renderer.setSize(width, height, false)
        }
        root.rotation.set(0, angle, 0)
        renderer.render(scene, camera)
    }
    window.requestAnimationFrame(() => paint())

    let lastTotalN = 0
    let lastTotalE = 0
    let lastTotalS = 0
    let lastTotalW = 0
    const updateTotals = (
        totalN: number,
        totalE: number,
        totalS: number,
        totalW: number
    ) => {
        if (lastTotalN !== totalN) {
            lastTotalN = totalN
            faceN.material.map = makeFaceTexture(totalN)
        }
        if (lastTotalE !== totalE) {
            lastTotalE = totalN
            faceE.material.map = makeFaceTexture(totalE)
        }
        if (lastTotalS !== totalS) {
            lastTotalS = totalN
            faceS.material.map = makeFaceTexture(totalS)
        }
        if (lastTotalW !== totalW) {
            lastTotalW = totalN
            faceW.material.map = makeFaceTexture(totalW)
        }
        window.requestAnimationFrame(() => paint())
    }
    return { paint, updateTotals }
}

function makeCompassMesh(compassTexture: ThreeTexture): ThreeMesh {
    const mesh = new ThreeMesh(
        new ThreePlaneGeometry(4, 4),
        new ThreeMeshPhongMaterial({
            map: compassTexture,
            transparent: true,
        })
    )
    mesh.position.set(0, -0.5, 0)
    mesh.rotateX(-Math.PI / 2)
    return mesh
}

function makeFace(quarter: 0 | 1 | 2 | 3, texture: ThreeTexture) {
    const radius = 1.5
    const angle = Math.PI * (2 - quarter) * 0.5
    const x = radius * Math.sin(angle)
    const y = radius * Math.cos(angle)
    const face = new ThreeMesh(
        new ThreePlaneGeometry(1, 1),
        new ThreeMeshPhongMaterial({
            map: texture,
            transparent: true,
            specular: 5,
        })
    )
    face.position.set(x, 1, y)
    face.rotation.set(0, angle, 0)
    return face
}

function makeFaceTexture(value: number): ThreeTexture {
    const SIZE = 128
    const canvas = document.createElement('canvas')
    canvas.width = SIZE
    canvas.height = SIZE
    const ctx = canvas.getContext('2d')
    if (!ctx) throw Error('Unable to create context 2D!')
    ctx.clearRect(0, 0, SIZE, SIZE)
    ctx.font = `bold ${SIZE / 2}px sans-serif`
    const text = `${value}`
    const measure = ctx.measureText(text)
    const x = (SIZE - measure.width) * 0.5
    const y = SIZE * 0.75
    ctx.fillStyle = value === 11 ? '#0f07' : '#f007'
    ctx.fillText(text, x, y)
    ctx.strokeStyle = '#000'
    ctx.lineWidth = SIZE * 0.01
    ctx.strokeText(text, x, y)
    const texture = new ThreeCanvasTexture(canvas)
    texture.flipY = true
    return texture
}
