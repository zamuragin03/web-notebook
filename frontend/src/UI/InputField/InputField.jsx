import React from 'react'
import classes from './InputField.module.css'

const InputField = ({children, clss, ...props}) => {
return (
    <input {...props}   className={[classes.MyInput, clss].join(' ')}>
        {children}
    </input>
  )
}

export default InputField