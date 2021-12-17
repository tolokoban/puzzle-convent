import * as React from "react"

export function useLanguage(Translate: {
    $lang: string
    $loadDefaultLang(lang: string): Promise<void>
}): [lang: string, setLang: (lang: string) => void] {
    const [lang, setLang] = React.useState("")
    const setLanguage = (language: string) => {
        Translate.$lang = language
        Translate.$loadDefaultLang(language)
            .then(() => setLang(language))
            .catch(console.error)
    }
    React.useEffect(() => {
        setLang("")
        setLanguage(Translate.$lang)
    }, [Translate])
    return [lang, setLanguage]
}
