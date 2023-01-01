import React from 'react'

const AuthContext = React.createContext({
    serviceItems:[],
    amount:0,
    addService:(service)=>{},
    removeService:(service)=>{},
    
    cartIsShown:false,
    setCartIsShown:()=>{},

    alertIsShown:false,
    setAlertIsShown:()=>{},

    confirmIsShown:false,
    setConfirmIsShown:()=>{},

    customerData : null,
    setCustomerData:(data)=>{}
})

export default AuthContext;