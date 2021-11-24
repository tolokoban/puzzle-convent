/**
 * Number of sleepers per room of a floor.
 * The first element is the north-west room.
 * Then we turn clock-wise.
 */
export type Rooms = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
]

export interface Assets {
    images: {
        floor: HTMLImageElement
    }
}
