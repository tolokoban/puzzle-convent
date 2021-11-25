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

    constructor(
        private readonly element: HTMLElement,
        private readonly onStart: () => void,
        private readonly onPan: (evt: PanEvent) => void,
        private readonly onSwipe: (evt: SwipeEvent) => void
    ) {
        element.addEventListener('pointerdown', this.handlePointerDown, false)
        element.addEventListener('pointermove', this.handlePointerMove, false)
        element.addEventListener('pointerup', this.handlePointerUp, false)
    }

    public detach() {
        const { element } = this
        element.removeEventListener(
            'pointerdown',
            this.handlePointerDown,
            false
        )
        element.removeEventListener(
            'pointermove',
            this.handlePointerMove,
            false
        )
        element.removeEventListener('pointerup', this.handlePointerUp, false)
    }

    private readonly handlePointerDown = (evt: PointerEvent) => {
        this.timeStamp = evt.timeStamp
        const [x, y] = this.getCoords(evt)
        this.x = x
        this.y = y
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
        const { timeStamp, onSwipe } = this
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
}
