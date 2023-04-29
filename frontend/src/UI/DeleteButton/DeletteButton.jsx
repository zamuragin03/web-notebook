import classes from './DeleteButton.module.css'

import React from 'react'

const DeleteButton = ({ clss, children, ...props }) => {
    return (
        <button {...props} className={[classes.myBtn, clss].join(' ')} >
            {children}
        </button>
    )
}
export default DeleteButton