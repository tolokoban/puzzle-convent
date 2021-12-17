import * as React from "react"

import "./language-button-view.css"

export interface LanguageButtonViewProps {
    className?: string
    lang: string
    label: string
    onClick(lang: string): void
}

export default function LanguageButtonView(props: LanguageButtonViewProps) {
    return (
        <div
            className={getClassNames(props)}
            tabIndex={1}
            onClick={() => props.onClick(props.lang)}
        >
            <svg
                width="48"
                height="48"
                version="1.1"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g>
                    <path
                        d="m12 29.5s-8.32-1.85-8.39-6.79c-0.065-4.94 1.6-7.12 5.67-9.32s23.8-2.72 29.5-0.3 6.55 5.43 6.26 9.11-2.07 5.35-7.64 7.37-21 0.577-21 0.577-2.06 3.13-4.13 4.55c-2.07 1.42-9.88 2.44-9.88 2.44s6.05-2.08 7.65-4.47c1.59-2.39 1.94-3.17 1.94-3.17z"
                        fill="#ffe"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth=".7"
                    />
                    <text
                        x="25.1"
                        y="24"
                        fill="#000e"
                        fontFamily="sans-serif"
                        fontSize="8px"
                        fontStyle="italic"
                        text-align="center"
                        textAnchor="middle"
                        style={{ lineHeight: 1.25 }}
                    >
                        <tspan x="25.1" y="24">
                            {props.label}
                        </tspan>
                    </text>
                </g>
            </svg>
        </div>
    )
}

function getClassNames(props: LanguageButtonViewProps): string {
    const classNames = ["custom", "view-LanguageButtonView"]
    if (typeof props.className === "string") {
        classNames.push(props.className)
    }

    return classNames.join(" ")
}
