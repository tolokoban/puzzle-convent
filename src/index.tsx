import "./index.css"
import "./fonts/fuzzy-bubbles.css"

import { loadGLTF, loadImage, loadTexture } from "./loader"

import AppView from "./view/app"
import { Assets } from "./types"
import CompassPng from "./gfx/compass.png"
import ConventGLTF from "./gfx/convent.glb"
import FloorPng from "./gfx/floor.png"
import FloorWebp from "./gfx/floor.webp"
import React from "react"
import ReactDOM from "react-dom"

// eslint-disable-next-line @typescript-eslint/no-floating-promises
start()

async function start() {
    const compassTexture = await loadTexture(CompassPng)
    const floorImage = await loadImage(FloorWebp, FloorPng)
    const conventMesh = await loadGLTF(ConventGLTF)
    const assets: Assets = {
        images: {
            floor: floorImage,
        },
        meshes: {
            convent: conventMesh,
        },
        textures: {
            compass: compassTexture,
        },
    }
    ReactDOM.render(
        <AppView assets={assets} />,
        document.getElementById("root")
    )
    removeSplashScreen()
}

function removeSplashScreen() {
    const SPLASH_VANISHING_DELAY = 900
    const splash = document.getElementById("tgd-logo")
    if (!splash) return

    splash.classList.add("vanish")
    window.setTimeout(() => {
        const parent = splash.parentNode
        if (!parent) return

        parent.removeChild(splash)
    }, SPLASH_VANISHING_DELAY)
}
