import { CONNREFUSED } from 'dns'
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

import { Rooms } from '../../types'

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
    const [a, b, c, d, e, f, g, h] = roomsFloor1
    const [A, B, C, D, E, F, G, H] = roomsFloor2
    const totalN = a + b + c + A + B + C
    const totalE = c + e + h + C + E + H
    const totalS = f + g + h + F + G + H
    const totalW = a + d + f + A + D + F
    useEffect(() => {
        const canvas = refCanvas.current
        if (!canvas) return

        const paint = initScene(canvas, meshes, compassTexture)
    }, [refCanvas])
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

    const textureN = makeFaceTexture(27)
    const faceN = makeFace(0, textureN)
    const textureE = makeFaceTexture(11)
    const faceE = makeFace(1, textureE)
    root.add(meshes.convent, makeCompassMesh(compassTexture), faceN, faceE)
    scene.add(root, ambientLight, directionalLight)

    let width = 0
    let height = 0

    const paint = (time: number) => {
        if (canvas.clientWidth !== width || canvas.clientHeight !== height) {
            width = canvas.clientWidth
            height = canvas.clientHeight
            canvas.width = width
            canvas.height = height
            camera.aspect = width / height
            camera.updateProjectionMatrix()
            renderer.setSize(width, height, false)
        }
        root.rotation.set(0, time * 0.001, 0)
        renderer.render(scene, camera)
    }
    const anim = (time: number) => {
        window.requestAnimationFrame(anim)
        paint(time)
    }
    window.requestAnimationFrame(anim)

    return paint
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
        new ThreePlaneGeometry(2, 2),
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
