import React from 'react'
import classes from './ColorPicker.module.css'
const ColorPicker = ({ ...props }) => {
    return (
        <input {...props}
            className={classes.myColorPicker}
            type="color" >

        </input>
    )
}

export default ColorPicker