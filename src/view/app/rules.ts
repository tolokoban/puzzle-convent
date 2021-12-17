import { Rooms } from "../../types"

export interface Rules {
    ruleN: boolean
    ruleE: boolean
    ruleS: boolean
    ruleW: boolean
    ruleDouble: boolean
    ruleTotal: boolean
}

export function checkRules(
    roomsFloor1: Rooms,
    roomsFloor2: Rooms,
    expectedPrisoners: number
): Rules {
    const SLEEPER_PER_FACE = 11
    const [a, b, c, d, e, f, g, h] = roomsFloor1
    const [A, B, C, D, E, F, G, H] = roomsFloor2
    return {
        ruleDouble:
            A + B + C + D + E + F + G + H ===
            double(a + b + c + d + e + f + g + h),
        ruleN: a + b + c + A + B + C === SLEEPER_PER_FACE,
        ruleE: c + e + h + C + E + H === SLEEPER_PER_FACE,
        ruleS: f + g + h + F + G + H === SLEEPER_PER_FACE,
        ruleW: a + d + f + A + D + F === SLEEPER_PER_FACE,
        ruleTotal:
            expectedPrisoners ===
            a + b + c + d + e + f + g + h + A + B + C + D + E + F + G + H,
    }
}

function double(value: number) {
    return value + value
}
