import classes from './CreateButton.module.css'

import React from 'react'

const CreateButton = ({ children, ...props }) => {
    return (
        <button {...props} className={classes.myBtn} >
            {children}
        </button>
    )
}
export default CreateButton