import * as React from 'react'

const KEY = `${Math.random()}HistoryState${Date.now()}`.substr(2)

/**
 * The state can change when the user click the browser's back button.
 * @param stateID An unique identifier for this type of state.
 * @param initialState The state to start with.
 */
export function useHistoryState<T>(
    stateID: string,
    initialState: T
): [state: T, setState: (state: T) => void] {
    const pushState = (s: T) => {
        console.log('🚀 PUSH ', s) // @FIXME: Remove this line written on 2021-12-01 at 17:30
        window.history.pushState(
            {
                [KEY]: stateID,
                value: s,
            },
            ''
        )
    }
    const [state, setState] = React.useState(initialState)
    React.useEffect(() => {
        pushState(initialState)
        const handler = (evt: PopStateEvent) => {
            const data: unknown = evt.state
            console.log('🚀 POP ', data) // @FIXME: Remove this line written on 2021-12-01 at 17:30
            if (!isObject(data)) {
                console.error('Not an object!', data)
                return
            }
            if (data[KEY] !== stateID) {
                console.error('Wrong key:', KEY, data)
                return
            }
            setState(data.value as T)
        }
        window.addEventListener('popstate', handler)
        return () => window.removeEventListener('popstate', handler)
    }, [stateID])
    return [
        state,
        (newState: T) => {
            setState(newState)
            pushState(newState)
        },
    ]
}

function isObject(data: unknown): data is { [key: string]: unknown } {
    if (!data) return false
    if (Array.isArray(data)) return false
    return typeof data === 'object'
}
