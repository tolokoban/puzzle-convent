import { PanEvent, SwipeEvent } from '../../gestures/swipe'

const FACTOR = Math.PI

const INITIAL_ANGLE = -0.4
const INITIAL_SPEED = 0.001

export default class RotationManager {
    private angle = INITIAL_ANGLE

    private speed = INITIAL_SPEED

    private timeStamp = 0

    constructor(private readonly onChange: (angle: number) => void) {
        window.requestAnimationFrame(this.anim)
    }

    public fire(currentAngle: number) {
        window.requestAnimationFrame(() => this.onChange(currentAngle))
    }

    public readonly handleStart = () => {
        this.speed = 0
    }

    public readonly handlePan = (evt: PanEvent) => {
        this.fire(this.angle + FACTOR * evt.deltaX)
    }

    public readonly handleSwipe = (evt: SwipeEvent) => {
        this.angle += FACTOR * evt.deltaX
        this.speed = evt.vectorX
        this.timeStamp = 0
        window.requestAnimationFrame(this.anim)
    }

    private readonly anim = (time: number) => {
        if (this.timeStamp === 0) {
            this.timeStamp = time
            window.requestAnimationFrame(this.anim)
            return
        }

        const deltaTime = time - this.timeStamp
        this.timeStamp = time
        this.angle += this.speed * deltaTime
        this.onChange(this.angle)
        const amortizer = Math.pow(0.5, deltaTime * 0.001)
        this.speed *= amortizer
        if (Math.abs(this.speed) > 1e-4) {
            window.requestAnimationFrame(this.anim)
        } else {
            console.log('STOP!', this.speed)
        }
    }
}
