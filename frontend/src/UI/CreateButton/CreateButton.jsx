import classes from './CreateButton.module.css'

import React from 'react'

const CreateButton = ({ clss, children, ...props }) => {
    
    return (
        <button {...props}  className={[classes.myBtn, clss].join(' ')} >
            {children}
        </button>
    )
}
export default CreateButton