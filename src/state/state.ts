import { Rooms } from "../types"
import { useHistoryState } from "../hooks/history-state"

export enum StageEnum {
    Introduction,
    FirstRound,
    FirstVictory,
    SecondRound,
    SecondVictory,
}

export interface State {
    stage: StageEnum
    roomsFloor1: Rooms
    roomsFloor2: Rooms
    totalPrisoners: number
    showInstructions: boolean
}

const INITIAL_STATE: State = {
    stage: StageEnum.Introduction,
    // eslint-disable-next-line no-magic-numbers
    roomsFloor1: [1, 2, 1, 2, 2, 1, 2, 1],
    // roomsFloor1: [3, 1, 3, 2, 2, 3, 1, 3],
    // eslint-disable-next-line no-magic-numbers
    roomsFloor2: [1, 9, 1, 5, 5, 1, 5, 1],
    // roomsFloor2: [3, 1, 3, 2, 2, 3, 1, 3],
    // eslint-disable-next-line no-magic-numbers
    totalPrisoners: 0,
    showInstructions: false,
}

const MAX_ROOM_INDEX = 8
const MIN_NB_PRISONERS = 1
const MAX_NB_PRISONERS = 9

export function useApplicationState() {
    const [state, setState] = useHistoryState("puzzle/convent", INITIAL_STATE)
    return {
        state,
        setStage(this: void, stage: StageEnum) {
            if (stage === state.stage) return

            const newState = {
                ...state,
                stage,
                totalPrisoners: deducePrisonersCountFromStage(stage),
            }
            if (stage === StageEnum.FirstRound) {
                newState.roomsFloor1 = [1, 2, 1, 2, 2, 1, 2, 1]
                newState.roomsFloor2 = [1, 9, 1, 5, 5, 1, 5, 1]
            } else if (stage === StageEnum.SecondRound) {
                newState.roomsFloor1 = [1, 1, 1, 1, 2, 1, 1, 1]
                newState.roomsFloor2 = [3, 2, 3, 1, 1, 4, 1, 3]
            }
            setState(newState)
        },
        hideInstructions(this: void) {
            if (!state.showInstructions) return

            setState({
                ...state,
                showInstructions: false,
            })
        },
        showInstructions(this: void) {
            if (state.showInstructions) return

            setState({
                ...state,
                showInstructions: true,
            })
        },
        setPrisonersInRoomAtFloor1: makeSetPrisonersInRoomAtFloor1(
            state,
            setState
        ),
        setPrisonersInRoomAtFloor2: makeSetPrisonersInRoomAtFloor2(
            state,
            setState
        ),
    }
}

export function setPrisonersInRoomAtFloor1(
    state: State,
    roomIndex: number,
    numberOfPrisoners: number
): State {
    if (roomIndex < 0 || roomIndex > MAX_ROOM_INDEX) return state
    if (
        numberOfPrisoners < MIN_NB_PRISONERS ||
        numberOfPrisoners > MAX_NB_PRISONERS
    )
        return state
    const newRoomsFloor1: Rooms = [...state.roomsFloor1]
    newRoomsFloor1[roomIndex] = numberOfPrisoners
    return {
        ...state,
        roomsFloor1: newRoomsFloor1,
    }
}

export function setPrisonersInRoomAtFloor2(
    state: State,
    roomIndex: number,
    numberOfPrisoners: number
): State {
    if (roomIndex < 0 || roomIndex > MAX_ROOM_INDEX) return state
    if (
        numberOfPrisoners < MIN_NB_PRISONERS ||
        numberOfPrisoners > MAX_NB_PRISONERS
    )
        return state
    const newRoomsFloor2: Rooms = [...state.roomsFloor2]
    newRoomsFloor2[roomIndex] = numberOfPrisoners
    return {
        ...state,
        roomsFloor2: newRoomsFloor2,
    }
}

function makeSetPrisonersInRoomAtFloor1(
    state: State,
    setState: (value: State) => void
) {
    return (roomIndex: number, numberOfPrisoners: number) => {
        if (
            roomIndex < 0 ||
            roomIndex > MAX_ROOM_INDEX ||
            numberOfPrisoners < MIN_NB_PRISONERS ||
            numberOfPrisoners > MAX_NB_PRISONERS
        ) {
            return
        }
        const roomsFloor1: Rooms = [...state.roomsFloor1]
        roomsFloor1[roomIndex] = numberOfPrisoners
        setState({
            ...state,
            roomsFloor1,
        })
    }
}

function makeSetPrisonersInRoomAtFloor2(
    state: State,
    setState: (value: State) => void
) {
    return (roomIndex: number, numberOfPrisoners: number) => {
        if (
            roomIndex < 0 ||
            roomIndex > MAX_ROOM_INDEX ||
            numberOfPrisoners < MIN_NB_PRISONERS ||
            numberOfPrisoners > MAX_NB_PRISONERS
        ) {
            return
        }
        const roomsFloor2: Rooms = [...state.roomsFloor2]
        roomsFloor2[roomIndex] = numberOfPrisoners
        setState({
            ...state,
            roomsFloor2,
        })
    }
}

function deducePrisonersCountFromStage(stage: StageEnum): number {
    if (stage === StageEnum.FirstRound) return 36
    if (stage === StageEnum.SecondRound) return 27
    return 0
}
