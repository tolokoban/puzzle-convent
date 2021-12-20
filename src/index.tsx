import "./index.css"
import "./theme.css"
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
import Translate from "./translate"

// eslint-disable-next-line @typescript-eslint/no-floating-promises
start()

async function start() {
    const container = document.getElementById("progress-container")
    const progress = document.getElementById("progress")
    if (!container || !progress) return

    container.classList.add("show")
    progress.setAttribute("value", "1")
    await Translate.$loadDefaultLang()
    progress.setAttribute("value", "2")
    const compassTexture = await loadTexture(CompassPng)
    progress.setAttribute("value", "3")
    const floorImage = await loadImage(FloorWebp, FloorPng)
    progress.setAttribute("value", "4")
    const conventMesh = await loadGLTF(ConventGLTF)
    progress.setAttribute("value", "5")
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
    document.body.removeChild(container)
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
