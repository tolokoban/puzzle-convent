type SerializableData =
    | null
    | boolean
    | number
    | string
    | SerializableData[]
    | { [key: string]: SerializableData }

declare module 'jso'
declare module 'markdown-to-jsx'

// @see https://v4.webpack.js.org/guides/typescript/

declare module '*.txt' {
    const value: string
    export default value
}

declare module '*.vert' {
    const value: string
    export default value
}

declare module '*.frag' {
    const value: string
    export default value
}

declare module '*.svg' {
    // Loaded as URL.
    const content: string
    export default content
}

declare module '*.yaml' {
    const value: SerializableData
    export = value
}

declare module '*.png' {
    const value: string
    export = value
}

declare module '*.jpg' {
    const value: string
    export = value
}

declare module '*.jpeg' {
    const value: string
    export = value
}

declare module '*.gif' {
    const value: string
    export = value
}

declare module '*.webp' {
    const value: string
    export = value
}

declare module '*.glb' {
    const value: string
    export = value
}

declare module '*.gltf' {
    const value: string
    export = value
}

declare module '*.css' {
    // Loaded as URL.
    const content: string
    export default content
}
