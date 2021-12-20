export interface PanEvent {
    /** Percentage of the width. */
    deltaX: number
    /** Percentage of the height. */
    deltaY: number
}

/**
 * Pan per milliseconds.
 * This event is triggered when the touch ends.
 */
export interface SwipeEvent extends PanEvent {
    vectorX: number
    vectorY: number
}

interface Handlers {
    onStart?(this: void): void
    onPan?(this: void, evt: PanEvent): void
    onSwipe?(this: void, evt: SwipeEvent): void
    onEnd?(this: void): void
}

export default class SwipeGesture {
    /**
     * If timestamp is diffferent of 0, it is the time when the element
     * has been touched.
     */
    private timeStamp = 0

    /**
     * Coords of the touch in percentage of the size.
     */
    private x = 0

    private y = 0

    private savedTouchAction = ""

    constructor(
        private readonly element: HTMLElement,
        private readonly handlers: Handlers
    ) {
        element.addEventListener("pointerdown", this.handlePointerDown, false)
        element.addEventListener("pointermove", this.handlePointerMove, false)
        element.addEventListener("pointerup", this.handlePointerUp, false)
        element.addEventListener("pointercancel", this.onEnd)
        element.addEventListener("contextmenu", this.handleContextMenu)
    }

    public detach() {
        const { element } = this
        element.removeEventListener(
            "pointerdown",
            this.handlePointerDown,
            false
        )
        element.removeEventListener(
            "pointermove",
            this.handlePointerMove,
            false
        )
        element.removeEventListener("pointerup", this.handlePointerUp, false)
        element.removeEventListener("pointercancel", this.onEnd)
        element.removeEventListener("contextmenu", this.handleContextMenu)
    }

    // eslint-disable-next-line class-methods-use-this
    private readonly handleContextMenu = (evt: Event) => {
        evt.preventDefault()
        evt.stopPropagation()
    }

    private readonly handlePointerDown = (evt: PointerEvent) => {
        this.timeStamp = evt.timeStamp
        const [x, y] = this.getCoords(evt)
        this.x = x
        this.y = y
        this.element.setPointerCapture(evt.pointerId)
        this.savedTouchAction = this.element.style.touchAction
        this.element.style.touchAction = "none"
        this.onStart()
    }

    private readonly handlePointerMove = (evt: PointerEvent) => {
        const { timeStamp, onPan } = this
        if (timeStamp === 0) return

        const [x, y] = this.getCoords(evt)
        const event: PanEvent = {
            deltaX: x - this.x,
            deltaY: y - this.y,
        }
        onPan(event)
    }

    private readonly handlePointerUp = (evt: PointerEvent) => {
        this.element.style.touchAction = this.savedTouchAction
        const { timeStamp, onSwipe, onEnd } = this
        const [x, y] = this.getCoords(evt)
        const deltaX = x - this.x
        const deltaY = y - this.y
        const deltaTime = evt.timeStamp - timeStamp
        const event: SwipeEvent = {
            deltaX,
            deltaY,
            vectorX: deltaX / deltaTime,
            vectorY: deltaY / deltaTime,
        }
        onSwipe(event)
        onEnd()
        this.timeStamp = 0
    }

    private getCoords(evt: PointerEvent): [x: number, y: number] {
        const { element } = this
        const rect = element.getBoundingClientRect()
        return [
            (evt.clientX - rect.left) / rect.width,
            (evt.clientY - rect.top) / rect.height,
        ]
    }

    private readonly onStart = () => {
        const { onStart } = this.handlers
        if (onStart) onStart()
    }

    private readonly onPan = (evt: PanEvent) => {
        const { onPan } = this.handlers
        if (onPan) onPan(evt)
    }

    private readonly onSwipe = (evt: SwipeEvent) => {
        const { onSwipe } = this.handlers
        if (onSwipe) onSwipe(evt)
    }

    private readonly onEnd = () => {
        const { onEnd } = this.handlers
        if (onEnd) onEnd()
    }
}
