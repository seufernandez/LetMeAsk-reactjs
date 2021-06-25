import { ButtonHTMLAttributes } from "react"

import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean,
} & {
    isOutlinedRed?: boolean
}


export function Button({ isOutlined = false, isOutlinedRed = false, ...props}:ButtonProps){

    return (
        <button 
        className={`button ${isOutlined? 'outLined' :''} ${isOutlinedRed? 'outLinedRed' :''}`}
        {...props} />
    )
}


