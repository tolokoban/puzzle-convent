import { Rooms } from '../types'
import { useHistoryState } from '../hooks/history-state'

export interface State {
    roomsFloor1: Rooms
    roomsFloor2: Rooms
    totalPeople: number
    step: number
    showInstructions: boolean
}

const INITIAL_STATE: State = {
    // eslint-disable-next-line no-magic-numbers
    roomsFloor1: [3, 1, 3, 2, 2, 3, 1, 3],
    // eslint-disable-next-line no-magic-numbers
    roomsFloor2: [3, 1, 3, 2, 2, 3, 1, 3],
    // eslint-disable-next-line no-magic-numbers
    totalPeople: 36,
    step: 1,
    showInstructions: true,
}

const MAX_ROOM_INDEX = 8
const MIN_NB_PEOPLE = 1
const MAX_NB_PEOPLE = 9

export function useApplicationState() {
    const [state, setState] = useHistoryState('puzzle/convent', INITIAL_STATE)
    return {
        state,
        setPeopleInRoomAtFloor1(
            this: void,
            roomIndex: number,
            numberOfPeople: number
        ) {
            if (
                roomIndex < 0 ||
                roomIndex > MAX_ROOM_INDEX ||
                numberOfPeople < MIN_NB_PEOPLE ||
                numberOfPeople > MAX_NB_PEOPLE
            ) {
                return
            }
            const roomsFloor1: Rooms = [...state.roomsFloor1]
            roomsFloor1[roomIndex] = numberOfPeople
            setState({
                ...state,
                roomsFloor1,
            })
        },
        setPeopleInRoomAtFloor2(
            this: void,
            roomIndex: number,
            numberOfPeople: number
        ) {
            if (
                roomIndex < 0 ||
                roomIndex > MAX_ROOM_INDEX ||
                numberOfPeople < MIN_NB_PEOPLE ||
                numberOfPeople > MAX_NB_PEOPLE
            ) {
                return
            }
            const roomsFloor2: Rooms = [...state.roomsFloor2]
            roomsFloor2[roomIndex] = numberOfPeople
            setState({
                ...state,
                roomsFloor2,
            })
        },
    }
}

export function setPeopleInRoomAtFloor1(
    state: State,
    roomIndex: number,
    numberOfPeople: number
): State {
    if (roomIndex < 0 || roomIndex > MAX_ROOM_INDEX) return state
    if (numberOfPeople < MIN_NB_PEOPLE || numberOfPeople > MAX_NB_PEOPLE)
        return state
    const newRoomsFloor1: Rooms = [...state.roomsFloor1]
    newRoomsFloor1[roomIndex] = numberOfPeople
    return {
        ...state,
        roomsFloor1: newRoomsFloor1,
    }
}

export function setPeopleInRoomAtFloor2(
    state: State,
    roomIndex: number,
    numberOfPeople: number
): State {
    if (roomIndex < 0 || roomIndex > MAX_ROOM_INDEX) return state
    if (numberOfPeople < MIN_NB_PEOPLE || numberOfPeople > MAX_NB_PEOPLE)
        return state
    const newRoomsFloor2: Rooms = [...state.roomsFloor2]
    newRoomsFloor2[roomIndex] = numberOfPeople
    return {
        ...state,
        roomsFloor2: newRoomsFloor2,
    }
}
