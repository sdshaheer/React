import React from 'react';
import { useContext } from 'react';
import AuthContext from './auth-context';
import classes from './CustomBookedButton.module.css';

const CustomBookedButton = (props) =>{

    const ctx = useContext(AuthContext);
    const handleChange = () =>{
        ctx.setCartIsShown();
    }

    return (
        <div className='container'>
            <button type='button' className={`m-3 float-end ${classes.button}`} onClick={handleChange}>
                <span>Your Services</span>
                <span className={classes.badge}>{ctx.serviceItems.length}</span>
            </button>
        </div>
    )
}

export default CustomBookedButton;