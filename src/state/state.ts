import { checkRules } from "../view/app/rules"

import { Rooms } from "../types"
import { useHistoryState } from "../hooks/history-state"

// eslint-disable-next-line no-shadow
export enum StepEnum {
    Introduction,
    FirstRound,
    FirstRules,
    FirstVictory,
    SecondRound,
    SecondRules,
    SecondVictory,
}

export interface State {
    step: StepEnum
    roomsFloor1: Rooms
    roomsFloor2: Rooms
}

const INITIAL_STATE: State = {
    step: StepEnum.Introduction,
    ...initRoomsForFirstRound(),
}

let currentState: State = INITIAL_STATE

export function useApplicationState() {
    const [state, setState] = useHistoryState("puzzle/convent", INITIAL_STATE)
    currentState = state
    return {
        state,
        hideInstructions: makeHideInstructions(setState),
        showInstructions: makeShowInstructions(setState),
        movePrisonerOfFloor1: makeMovePrisonerOfFloor1(setState),
        movePrisonerOfFloor2: makeMovePrisonerOfFloor2(setState),
        rules: checkRules(state),
    }
}

function makeMovePrisonerOfFloor1(setState: (value: State) => void) {
    return (from: number, to: number) => {
        const state = currentState
        const roomsFloor1: Rooms = [...state.roomsFloor1]
        roomsFloor1[from]--
        roomsFloor1[to]++
        const { roomsFloor2 } = state
        setState({
            ...state,
            roomsFloor1,
            step: moveToNextStepIfVictory(state.step, roomsFloor1, roomsFloor2),
        })
    }
}

function makeMovePrisonerOfFloor2(setState: (value: State) => void) {
    return (from: number, to: number) => {
        const state = currentState
        const roomsFloor2: Rooms = [...state.roomsFloor2]
        roomsFloor2[from]--
        roomsFloor2[to]++
        const { roomsFloor1 } = state
        setState({
            ...state,
            roomsFloor2,
            step: moveToNextStepIfVictory(state.step, roomsFloor1, roomsFloor2),
        })
    }
}

function makeShowInstructions(setState: (value: State) => void) {
    return () => {
        const state = currentState
        switch (state.step) {
            case StepEnum.FirstRound:
                return setState({ ...state, step: StepEnum.FirstRules })
            case StepEnum.SecondRound:
                return setState({ ...state, step: StepEnum.SecondRules })
            default:
                throw Error(
                    `Impossible to OPEN from step "${getStepName(state.step)}"!`
                )
        }
    }
}

function makeHideInstructions(setState: (value: State) => void) {
    return () => {
        const state = currentState
        switch (state.step) {
            case StepEnum.Introduction:
                setState({
                    ...state,
                    step: StepEnum.FirstRound,
                    ...initRoomsForFirstRound(),
                })
                break
            case StepEnum.FirstRules:
                setState({
                    ...state,
                    step: StepEnum.FirstRound,
                })
                break
            case StepEnum.FirstVictory:
                setState({
                    ...state,
                    step: StepEnum.SecondRound,
                    ...initRoomsForSecondRound(),
                })
                break
            case StepEnum.SecondRules:
                setState({
                    ...state,
                    step: StepEnum.SecondRound,
                })
                break
            case StepEnum.SecondVictory:
                setState({
                    ...state,
                    step: StepEnum.Introduction,
                })
                break
            default:
                throw Error(
                    `Impossible to CLOSE from step "${getStepName(
                        state.step
                    )}"!`
                )
        }
    }
}

function initRoomsForFirstRound() {
    return {
        // eslint-disable-next-line no-magic-numbers
        roomsFloor1: randomFloor(12),
        // eslint-disable-next-line no-magic-numbers
        roomsFloor2: randomFloor(24),
    }
}

function initRoomsForSecondRound() {
    return {
        // eslint-disable-next-line no-magic-numbers
        roomsFloor1: randomFloor(9),
        // eslint-disable-next-line no-magic-numbers
        roomsFloor2: randomFloor(18),
    }
}

function randomFloor(prisonersCount: number): Rooms {
    const rooms: Rooms = [0, 0, 0, 0, 0, 0, 0, 0]
    for (let i = 0; i < prisonersCount; i++) {
        const k = Math.floor(Math.random() * rooms.length)
        rooms[k]++
    }
    return rooms
}

function getStepName(step: StepEnum) {
    switch (step) {
        case StepEnum.FirstRound:
            return "FirstRound"
        case StepEnum.FirstRules:
            return "FirstRules"
        case StepEnum.FirstVictory:
            return "FirstVictory"
        case StepEnum.Introduction:
            return "Introduction"
        case StepEnum.SecondRound:
            return "SecondRound"
        case StepEnum.SecondRules:
            return "SecondRules"
        case StepEnum.SecondVictory:
            return "SecondVictory"
        default:
            return `${step as number} ???`
    }
}

function moveToNextStepIfVictory(
    step: StepEnum,
    roomsFloor1: Rooms,
    roomsFloor2: Rooms
): StepEnum {
    if (step !== StepEnum.FirstRound && step !== StepEnum.SecondRound)
        return step

    const rules = checkRules({ roomsFloor1, roomsFloor2 })
    const { ruleN, ruleE, ruleS, ruleW } = rules
    if (!ruleN || !ruleE || !ruleS || !ruleW) return step

    const nextStep =
        step === StepEnum.FirstRound
            ? StepEnum.FirstVictory
            : StepEnum.SecondVictory
    return nextStep
}
