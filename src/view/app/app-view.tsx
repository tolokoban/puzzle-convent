import './app-view.css'

import * as React from 'react'

import { Assets } from '../../types'
import FloorView from '../convent-floor'

export interface AppViewProps {
    className?: string
    assets: Assets
}

export default function AppView(props: AppViewProps) {
    return (
        <div className={getClassNames(props)}>
            <FloorView background={props.assets.images.floor} />
            <FloorView background={props.assets.images.floor} />
            <div className="fill">Blablabla...</div>
        </div>
    )
}

function getClassNames(props: AppViewProps): string {
    const classNames = ['custom', 'view-AppView']
    if (typeof props.className === 'string') {
        classNames.push(props.className)
    }

    return classNames.join(' ')
}
