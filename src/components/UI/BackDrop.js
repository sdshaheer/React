import React from 'react'
import { useContext } from 'react'
import AuthContext from '../Store/auth-context'
import classes from './BackDrop.module.css'

const BackDrop = (props) =>{

    const ctx = useContext(AuthContext)

    const handleChange = () =>{
        if(props.value==='CART'){
            ctx.setCartIsShown();
        }
        if(props.value==='ALERT'){
            ctx.setAlertIsShown();
        }
        
    }

    return (
        <div className={classes.backdrop} onClick={handleChange}/>
    )
}
export default BackDrop;
