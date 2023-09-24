import React, { useCallback, useEffect, useRef, useState } from 'react'

export const useStateWithCallBack = (intialState) => {
    const[state,setState] =useState(intialState)
    const cbRef = useRef()
    const updateState = useCallback((newState,cb)=>{
        cbRef.current = cb;
        setState((prev)=>{
            return typeof newState === 'function' ? newState(prev):newState
        })
    },[])
    useEffect(()=>{
        if(cbRef.current){
            cbRef.current(state)
            cbRef.current=null
        }
        
    },[state])
    return [state,updateState]
}
