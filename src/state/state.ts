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

export function useApplicationState() {
    const [state, setState] = useHistoryState("puzzle/convent", INITIAL_STATE)
    Object.freeze(state)
    console.log('🚀 [state] state = ', state) // @FIXME: Remove this line written on 2021-12-18 at 22:57
    return {
        state,
        hideInstructions: makeHideInstructions(state, setState),
        showInstructions: makeShowInstructions(state, setState),
        movePrisonerOfFloor1(this: void, from: number, to: number) {
            const roomsFloor1: Rooms = [...state.roomsFloor1]
            roomsFloor1[from]--
            roomsFloor1[to]++
            const { roomsFloor2 } = state
            setState({
                ...state,
                roomsFloor1,
                step: moveToNextStepIfVictory(
                    state.step,
                    roomsFloor1,
                    roomsFloor2
                ),
            })
        },
        movePrisonerOfFloor2(this: void, from: number, to: number) {
            console.log('🚀 [state] from, to = ', from, to) // @FIXME: Remove this line written on 2021-12-18 at 22:53
            const roomsFloor2: Rooms = [...state.roomsFloor2]
            roomsFloor2[from]--
            roomsFloor2[to]++
            const { roomsFloor1 } = state
            setState({
                ...state,
                roomsFloor2,
                step: moveToNextStepIfVictory(
                    state.step,
                    roomsFloor1,
                    roomsFloor2
                ),
            })
        },
        rules: checkRules(state),
    }
}

function makeShowInstructions(state: State, setState: (value: State) => void) {
    return () => {
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

function makeHideInstructions(state: State, setState: (value: State) => void) {
    return () => {
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
        roomsFloor1: [1, 2, 1, 2, 2, 1, 2, 1] as Rooms,
        // eslint-disable-next-line no-magic-numbers
        roomsFloor2: [3, 3, 1, 5, 5, 1, 5, 1] as Rooms,
    }
}

function initRoomsForSecondRound() {
    return {
        // eslint-disable-next-line no-magic-numbers
        roomsFloor1: [1, 1, 1, 1, 9, 1, 1, 1] as Rooms,
        // eslint-disable-next-line no-magic-numbers
        roomsFloor2: [3, 2, 3, 1, 1, 4, 5, 3] as Rooms,
    }
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
