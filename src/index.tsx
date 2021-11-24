import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'

import FloorPng from './gfx/floor.png'
import FloorWebp from './gfx/floor.webp'
import { Assets } from './types'
import AppView from './view/app'

void start()

async function start() {
    const floorImage = await loadImage(FloorWebp, FloorPng)
    const assets: Assets = {
        images: {
            floor: floorImage,
        },
    }
    ReactDOM.render(
        <AppView assets={assets} />,
        document.getElementById('root')
    )
    removeSplashScreen()
}

function removeSplashScreen() {
    const SPLASH_VANISHING_DELAY = 900
    const splash = document.getElementById('tgd-logo')
    if (!splash) return

    splash.classList.add('vanish')
    window.setTimeout(() => {
        const parent = splash.parentNode
        if (!parent) return

        parent.removeChild(splash)
    }, SPLASH_VANISHING_DELAY)
}

async function loadImage(...urls: string[]): Promise<HTMLImageElement> {
    for (const url of urls) {
        const img = await tryToLoadImage(url)
        if (img) return img
    }
    throw Error(
        `Unable to load image from ${urls.map((url) => `"${url}"`).join(', ')}`
    )
}

async function tryToLoadImage(url: string): Promise<HTMLImageElement | null> {
    return new Promise<HTMLImageElement | null>((resolve) => {
        const img = new Image()
        img.src = url
        img.onload = () => resolve(img)
        img.onerror = () => resolve(null)
    })
}
