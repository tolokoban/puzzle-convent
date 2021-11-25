import {
    Group as ThreeGroup,
    Texture as ThreeTexture,
    TextureLoader as ThreeTextureLoader,
} from 'three'
import { GLTFLoader as ThreeGLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

/**
 * Asynchroously load an image whose URL is in the `urls` list.
 * We try each URL once after the other until one is laoded without error.
 * This is useful for compatibility purpose. For instance, loading the webp
 * before the png.
 * ```ts
 * const img = await loadImage("house.webp", "house.png")
 * ```
 */
export async function loadImage(...urls: string[]): Promise<HTMLImageElement> {
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

const GLTFLoader = new ThreeGLTFLoader()

export async function loadGLTF(url: string): Promise<ThreeGroup> {
    try {
        const gltf = await GLTFLoader.loadAsync(url)
        return gltf.scene
    } catch (ex) {
        console.error(`Unable to load GLTF "${url}":`, ex)
        throw ex
    }
}

const TextureLoader = new ThreeTextureLoader()

export async function loadTexture(url: string): Promise<ThreeTexture> {
    return new Promise((resolve) => {
        const texture = TextureLoader.load(url, resolve)
    })
}
