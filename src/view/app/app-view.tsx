import "./app-view.css"

import * as React from "react"

import { Assets, Rooms } from "../../types"
import { Rules, checkRules } from "./rules"
import { State, useApplicationState } from "../../state"

import Convent3DView from "../convent-3d"
import FloorView from "../convent-floor"
import LanguageButton from "../language-button"
import Markdown from "markdown-to-jsx"
import { StageEnum } from "../../state/state"
import Translate from "@/translate"
import { inputDigit } from "../../input-digit"
import { useLanguage } from "../../hooks/language"

export interface AppViewProps {
    className?: string
    assets: Assets
}

export default function AppView(props: AppViewProps) {
    const [lang, setLang] = useLanguage(Translate)
    const {
        state,
        hideInstructions,
        showInstructions,
        setPrisonersInRoomAtFloor1,
        setPrisonersInRoomAtFloor2,
        setStage,
    } = useApplicationState()
    const refInstructions = useRefInstructions(state)
    const rules: Rules = useRules(state, setStage)
    const handleCloseInstructions = makeCloseInstructionsHandler(
        hideInstructions,
        state,
        setStage
    )
    return (
        <div className={getClassNames(props)}>
            {renderFloors(
                state,
                props,
                setPrisonersInRoomAtFloor1,
                setPrisonersInRoomAtFloor2
            )}
            {renderPreviewPane(
                state.roomsFloor1,
                state.roomsFloor2,
                props,
                rules,
                showInstructions
            )}
            {renderInstructions(
                refInstructions,
                state,
                rules,
                lang,
                setLang,
                handleCloseInstructions
            )}
        </div>
    )
}

function useRefInstructions(state: State) {
    const refInstructions = React.useRef<HTMLDivElement | null>(null)
    React.useEffect(() => {
        const div = refInstructions.current
        if (!div) return

        div.scrollTo({
            top: 0,
            behavior: "auto",
        })
    }, [state.stage])
    return refInstructions
}

function useRules(
    state: State,
    setStage: (this: void, stage: StageEnum) => void
) {
    const rules: Rules = checkRules(
        state.roomsFloor1,
        state.roomsFloor2,
        state.totalPrisoners
    )
    React.useEffect(() => {
        const { ruleDouble, ruleE, ruleN, ruleS, ruleTotal, ruleW } = rules
        if (ruleDouble && ruleE && ruleN && ruleS && ruleTotal && ruleW) {
            if (state.stage === StageEnum.FirstRound) {
                setStage(StageEnum.FirstVictory)
            } else if (state.stage === StageEnum.SecondRound) {
                setStage(StageEnum.SecondVictory)
            }
        }
    }, [
        rules.ruleDouble,
        rules.ruleE,
        rules.ruleN,
        rules.ruleS,
        rules.ruleTotal,
        rules.ruleW,
    ])
    return rules
}

function makeCloseInstructionsHandler(
    closeInstructions: (this: void) => void,
    state: State,
    setStage: (this: void, stage: StageEnum) => void
) {
    return () => {
        console.log("CLOSE")
        closeInstructions()
        switch (state.stage) {
            case StageEnum.Introduction:
                setStage(StageEnum.FirstRound)
                break
            case StageEnum.FirstVictory:
                setStage(StageEnum.SecondRound)
                break
            default:
            // Nothing to do.
        }
    }
}

function renderInstructions(
    refInstructions: React.MutableRefObject<HTMLDivElement | null>,
    state: State,
    rules: Rules,
    lang: string,
    setLang: (language: string) => void,
    onClose: () => void
) {
    const instructionsAreVisible =
        state.showInstructions ||
        state.stage === StageEnum.Introduction ||
        state.stage === StageEnum.FirstVictory ||
        state.stage === StageEnum.SecondVictory
    return (
        <div
            ref={refInstructions}
            className={`message ${instructionsAreVisible ? "show" : "hide"}`}
        >
            {renderLanguageSelection(lang, setLang)}
            {renderInstructionsAccordingToStage(
                state.stage,
                state,
                rules,
                onClose
            )}
        </div>
    )
}

function renderInstructionsAccordingToStage(
    stage: StageEnum,
    state: State,
    rules: Rules,
    onClose: () => void
) {
    switch (stage) {
        case StageEnum.Introduction:
            return renderIntro(onClose)
        case StageEnum.FirstVictory:
            return renderFirstVictory(onClose)
        default:
            return renderInstructionsRules(state, rules, onClose)
    }
}

function renderInstructionsRules(
    state: State,
    rules: Rules,
    onClose: () => void
) {
    return (
        <>
            {renderRulesDetails(state, rules, false)}
            {renderRulesDetails(state, rules, true)}
            <hr />
            <button onClick={onClose}>{Translate.close}</button>
            <hr />
            <Markdown>{Translate.howToPlay}</Markdown>
        </>
    )
}

function renderFirstVictory(onClose: () => void): React.ReactNode {
    return (
        <>
            <Markdown>{Translate.wellDone1}</Markdown>
            <hr />
            <button onClick={onClose}>{Translate.close}</button>
        </>
    )
}

function renderIntro(onClose: () => void): React.ReactNode {
    return (
        <>
            <Markdown>{Translate.intro}</Markdown>
            <hr />
            <button onClick={onClose}>{Translate.close}</button>
            <hr />
            <Markdown>{Translate.howToPlay}</Markdown>
        </>
    )
}

function renderLanguageSelection(
    lang: string,
    setLang: (language: string) => void
) {
    return (
        <div className="languages">
            <LanguageButton
                className={lang === "fr" ? "selected" : ""}
                lang="fr"
                label="Français"
                onClick={setLang}
            />
            <LanguageButton
                className={lang === "it" ? "selected" : ""}
                lang="it"
                label="Italiano"
                onClick={setLang}
            />
            <LanguageButton
                className={lang === "en" ? "selected" : ""}
                lang="en"
                label="English"
                onClick={setLang}
            />
        </div>
    )
}

function renderRulesDetails(
    state: State,
    { ruleN, ruleE, ruleS, ruleW, ruleDouble, ruleTotal }: Rules,
    expected: boolean
) {
    return (
        <>
            {renderRuleDetail("N", Translate.ruleNorth, ruleN, expected)}
            {renderRuleDetail("E", Translate.ruleEast, ruleE, expected)}
            {renderRuleDetail("S", Translate.ruleSouth, ruleS, expected)}
            {renderRuleDetail("W", Translate.ruleWest, ruleW, expected)}
            {renderRuleDetail("x2", Translate.ruleDouble, ruleDouble, expected)}
            {renderRuleDetail(
                "∑",
                Translate.ruleSum(`${state.totalPrisoners}`),
                ruleTotal,
                expected
            )}
        </>
    )
}

function renderFloors(
    state: State,
    props: AppViewProps,
    setPrisonersInRoomAtFloor1: (
        this: void,
        roomIndex: number,
        numberOfPrisoners: number
    ) => void,
    setPrisonersInRoomAtFloor2: (
        this: void,
        roomIndex: number,
        numberOfPrisoners: number
    ) => void
) {
    const THREE = 3
    const totalFloor1 = state.totalPrisoners / THREE
    const totalFloor2 = (state.totalPrisoners + state.totalPrisoners) / THREE
    return (
        <>
            <FloorView
                total={totalFloor1}
                rooms={state.roomsFloor1}
                background={props.assets.images.floor}
                onRoomClick={(roomIndex: number, x: number, y: number) =>
                    inputNbPrisoners(
                        roomIndex,
                        x,
                        y,
                        setPrisonersInRoomAtFloor1
                    )
                }
            />
            <FloorView
                total={totalFloor2}
                rooms={state.roomsFloor2}
                background={props.assets.images.floor}
                onRoomClick={(roomIndex: number, x: number, y: number) =>
                    inputNbPrisoners(
                        roomIndex,
                        x,
                        y,
                        setPrisonersInRoomAtFloor2
                    )
                }
            />
        </>
    )
}

function renderRuleDetail(
    initial: string,
    text: string,
    rule: boolean,
    expected: boolean
) {
    if (rule !== expected) return null

    return (
        <div className="rule">
            <div className={rule ? "yes" : "no"}>{initial}</div>
            <Markdown>{text}</Markdown>
        </div>
    )
}

function renderPreviewPane(
    roomsFloor1: Rooms,
    roomsFloor2: Rooms,
    props: AppViewProps,
    { ruleN, ruleE, ruleS, ruleW, ruleDouble, ruleTotal }: Rules,
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
            {renderFooter(
                ruleN,
                ruleE,
                ruleS,
                ruleW,
                ruleDouble,
                ruleTotal,
                onOpenInstruction
            )}
        </div>
    )
}

function renderFooter(
    ruleN: boolean,
    ruleE: boolean,
    ruleS: boolean,
    ruleW: boolean,
    ruleDouble: boolean,
    ruleTotal: boolean,
    onOpenInstruction: () => void
) {
    return (
        <footer onClick={onOpenInstruction}>
            <div className={ruleN ? "yes" : "no"}>N</div>
            <div className={ruleE ? "yes" : "no"}>E</div>
            <div className={ruleS ? "yes" : "no"}>S</div>
            <div className={ruleW ? "yes" : "no"}>W</div>
            <div className={ruleDouble ? "yes" : "no"}>x2</div>
            <div className={ruleTotal ? "yes" : "no"}>∑</div>
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

async function inputNbPrisoners(
    roomIndex: number,
    x: number,
    y: number,
    setPrisonersInRoom: (
        this: void,
        index: number,
        numberOfPrisoners: number
    ) => void
) {
    const numberOfPrisoners = await inputDigit(x, y)
    setPrisonersInRoom(roomIndex, numberOfPrisoners)
}
