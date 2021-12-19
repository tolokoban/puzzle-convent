import "./app-view.css"

import * as React from "react"

import { Assets, Rooms } from "../../types"
import { State, useApplicationState } from "../../state"

import Convent3DView from "../convent-3d"
import FloorView from "../convent-floor"
import Instructions from "./instructions"
import { Rules } from "./rules"

export interface AppViewProps {
    className?: string
    assets: Assets
}

export default function AppView(props: AppViewProps) {
    const {
        state,
        hideInstructions,
        showInstructions,
        movePrisonerOfFloor1,
        movePrisonerOfFloor2,
        rules,
    } = useApplicationState()
    return (
        <div className={getClassNames(props)}>
            {renderFloors(
                state,
                props,
                movePrisonerOfFloor1,
                movePrisonerOfFloor2
            )}
            {renderPreviewPane(
                state.roomsFloor1,
                state.roomsFloor2,
                props,
                rules,
                showInstructions
            )}
            <Instructions
                onClose={hideInstructions}
                rules={rules}
                step={state.step}
            />
        </div>
    )
}

function renderFloors(
    state: State,
    props: AppViewProps,
    movePrisonerOfFloor1: (this: void, from: number, to: number) => void,
    movePrisonerOfFloor2: (this: void, from: number, to: number) => void
) {
    return (
        <>
            <FloorView
                rooms={state.roomsFloor1}
                background={props.assets.images.floor}
                onMove={movePrisonerOfFloor1}
            />
            <FloorView
                rooms={state.roomsFloor2}
                background={props.assets.images.floor}
                onMove={movePrisonerOfFloor2}
            />
        </>
    )
}

function renderPreviewPane(
    roomsFloor1: Rooms,
    roomsFloor2: Rooms,
    props: AppViewProps,
    rules: Rules,
    onOpenInstruction: () => void
) {
    return (
        <div className="fill">
            <Convent3DView
                roomsFloor1={roomsFloor1}
                roomsFloor2={roomsFloor2}
                meshes={props.assets.meshes}
                compassTexture={props.assets.textures.compass}
            />
            {renderFooter(rules, onOpenInstruction)}
        </div>
    )
}

function renderFooter(rules: Rules, onOpenInstruction: () => void) {
    return (
        <footer onClick={onOpenInstruction}>
            <div className={rules.ruleN ? "yes" : "no"}>N</div>
            <div className={rules.ruleE ? "yes" : "no"}>E</div>
            <div className={rules.ruleS ? "yes" : "no"}>S</div>
            <div className={rules.ruleW ? "yes" : "no"}>W</div>
            <div className={rules.ruleEmpty ? "yes" : "no"}>∅</div>
        </footer>
    )
}

function getClassNames(props: AppViewProps): string {
    const classNames = ["custom", "view-AppView"]
    if (typeof props.className === "string") {
        classNames.push(props.className)
    }

    return classNames.join(" ")
}
