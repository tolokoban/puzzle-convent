import { Rooms } from "../../types"

export interface Rules {
    ruleN: boolean
    ruleE: boolean
    ruleS: boolean
    ruleW: boolean
}

const PRISONERS_PER_FACE = 11

export function checkRules({
    roomsFloor1,
    roomsFloor2,
}: {
    roomsFloor1: Rooms
    roomsFloor2: Rooms
}): Rules {
    const [a, b, c, d, e, f, g, h] = roomsFloor1
    const [A, B, C, D, E, F, G, H] = roomsFloor2
    return {
        ruleN: a + b + c + A + B + C === PRISONERS_PER_FACE,
        ruleE: c + e + h + C + E + H === PRISONERS_PER_FACE,
        ruleS: f + g + h + F + G + H === PRISONERS_PER_FACE,
        ruleW: a + d + f + A + D + F === PRISONERS_PER_FACE,
    }
}
