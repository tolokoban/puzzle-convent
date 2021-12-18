import "./instructions-view.css"

import * as React from "react"

import LanguageButton from "../../language-button"
import Markdown from "markdown-to-jsx"
import { Rules } from "../rules"
import { StepEnum } from "../../../state/state"
import Translate from "@/translate"
import { useLanguage } from "../../../hooks/language"

export interface InstructionsViewProps {
    className?: string
    step: StepEnum
    rules: Rules
    onClose(this: void): void
}

export default function InstructionsView(props: InstructionsViewProps) {
    const [lang, setLang] = useLanguage(Translate)
    const refInstructions = React.useRef<HTMLDivElement | null>(null)
    React.useEffect(() => {
        // Scroll back to top.
        const div = refInstructions.current
        if (!div) return

        div.scrollTo({
            top: 0,
            behavior: "auto",
        })
    }, [props.step])
    return (
        <div className={getClassNames(props)} ref={refInstructions}>
            {renderLanguageSelection(lang, setLang)}
            {renderCurrentStep(props.step, props.rules, props.onClose)}
            <hr />
            <Markdown>{Translate.howToPlay}</Markdown>
        </div>
    )
}

function getClassNames(props: InstructionsViewProps): string {
    const classNames = ["custom", "view-app-InstructionsView"]
    if (typeof props.className === "string") {
        classNames.push(props.className)
    }
    switch (props.step) {
        case StepEnum.Introduction:
        case StepEnum.FirstRules:
        case StepEnum.FirstVictory:
        case StepEnum.SecondRules:
        case StepEnum.SecondVictory:
            classNames.push("show")
            break
        default:
            classNames.push("hide")
            break
    }

    return classNames.join(" ")
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

function renderCurrentStep(
    step: StepEnum,
    rules: Rules,
    onClose: (this: void) => void
): React.ReactNode {
    switch (step) {
        case StepEnum.Introduction:
            return renderStepIntroduction(onClose)
        case StepEnum.FirstRules:
        case StepEnum.SecondRules:
            return renderStepRules(rules, onClose)
        case StepEnum.FirstVictory:
            return renderStepFirstVictory(onClose)
        case StepEnum.SecondVictory:
            return renderStepSecondVictory(onClose)
        default:
            return <div className="error">Unexpected step: {step}</div>
    }
}

function renderStepIntroduction(
    onClose: (this: void) => void
): React.ReactNode {
    return (
        <>
            <Markdown>{Translate.intro}</Markdown>
            <button onClick={onClose}>{Translate.startButton}</button>
        </>
    )
}

function renderStepRules(
    rules: Rules,
    onClose: (this: void) => void
): React.ReactNode {
    return (
        <>
            {renderRuleDetail("N", Translate.ruleNorth, rules.ruleN)}
            {renderRuleDetail("E", Translate.ruleEast, rules.ruleE)}
            {renderRuleDetail("S", Translate.ruleSouth, rules.ruleS)}
            {renderRuleDetail("W", Translate.ruleWest, rules.ruleW)}
            <button onClick={onClose}>{Translate.backButton}</button>
        </>
    )
}

function renderRuleDetail(initial: string, text: string, rule: boolean) {
    return (
        <div className="rule">
            <div className={rule ? "yes" : "no"}>{initial}</div>
            <Markdown>{text}</Markdown>
        </div>
    )
}

function renderStepFirstVictory(
    onClose: (this: void) => void
): React.ReactNode {
    return (
        <>
            <Markdown>{Translate.wellDone1}</Markdown>
            <button onClick={onClose}>{Translate.startButton}</button>
        </>
    )
}

function renderStepSecondVictory(
    onClose: (this: void) => void
): React.ReactNode {
    return (
        <>
            <Markdown>{Translate.wellDone2}</Markdown>
            <button onClick={onClose}>{Translate.startButton}</button>
        </>
    )
}
