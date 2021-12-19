/**
 * This file has been automatically generated
 * @file translate/translate.ts
 * @date 2021-12-19T17:22:30.820Z
 */
/* eslint-disable prettier/prettier */
/* eslint-disable lines-between-class-members */
import TranslateBase from './translate-base'

export class AppTranslations extends TranslateBase {
    constructor() {
        super()
        this._registerTranslationsLoader(
            async (lang: string): Promise<{ [key: string]: string }> => {
                switch (lang) {
                    case "en": return (await import("./translations/lang-en")).default
                    case "fr": return (await import("./translations/lang-fr")).default
                    case "it": return (await import("./translations/lang-it")).default
                    default: return {}
                }
            }
        )
    }

    get backButton() { return this._("back-button") }
    get close() { return this._("close") }
    get howToPlay() { return this._("how-to-play") }
    get intro() { return this._("intro") }
    get restart() { return this._("restart") }
    get ruleDouble() { return this._("rule-double") }
    get ruleEast() { return this._("rule-east") }
    get ruleEmpty() { return this._("rule-empty") }
    get ruleNorth() { return this._("rule-north") }
    get ruleSouth() { return this._("rule-south") }
    ruleSum(...args: string[]) { return this._("rule-sum", ...args) }
    get ruleWest() { return this._("rule-west") }
    get secondRoundButton() { return this._("second-round-button") }
    get startButton() { return this._("start-button") }
    get title() { return this._("title") }
    get wellDone1() { return this._("well-done1") }
    get wellDone2() { return this._("well-done2") }
}

export default new AppTranslations()
