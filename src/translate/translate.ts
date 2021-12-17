/**
 * This file has been automatically generated
 * @file translate/translate.ts
 * @date 2021-12-17T15:14:49.160Z
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

    get close() { return this._("close") }
    get howToPlay() { return this._("how-to-play") }
    get intro() { return this._("intro") }
    get ruleDouble() { return this._("rule-double") }
    get ruleEast() { return this._("rule-east") }
    get ruleNorth() { return this._("rule-north") }
    get ruleSouth() { return this._("rule-south") }
    ruleSum(...args: string[]) { return this._("rule-sum", ...args) }
    get ruleWest() { return this._("rule-west") }
    get title() { return this._("title") }
    get wellDone1() { return this._("well-done1") }
}

export default new AppTranslations()
