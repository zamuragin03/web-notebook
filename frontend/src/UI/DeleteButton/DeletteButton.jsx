import classes from './DeleteButton.module.css'

import React from 'react'

const DeleteButton = ({ children, ...props }) => {
    return (
        <button {...props} className={classes.myBtn} >
            {children}
        </button>
    )
}
export default DeleteButton