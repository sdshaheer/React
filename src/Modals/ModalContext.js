import React from 'react'

const ModalContext = React.createContext({
    mobileNumber:'9550007935',
    loginId:'SHAHEER',
    loginPassword:'SHAHEER',
    setLoginPassword:(password)=>{},

    showModal:false,
    setShowModal:()=>{},

    globalMessage:'',
    setGlobalMessage:(message)=>{}
})

export default ModalContext;