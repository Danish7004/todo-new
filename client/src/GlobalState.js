import React,{createContext, useState, useEffect} from "react";
import axios from 'axios';

//component import
import UserApi from "./api/UserApi"; 
import NotesApi from "./api/NotesApi";


export const GlobalState = createContext();

export const DataProvider = ({children}) =>{

    const [token, setToken] = useState(false)

    // const refreshToken = async () =>{
    //     const res = await axios.get('http://mytodo-mernapp.onrender.com/user/refresh_token')
    //     // console.log(res);
    //     setToken(res.data.accesstoken)
    // }

    useEffect(()=>{
        const firstLogin = localStorage.getItem('firstLogin')
        const accesstoken = localStorage.getItem('accesstoken')
        if(firstLogin){
            setToken(accesstoken)
        }
    }, [])

    const state = {
        token: [token, setToken],
        userApi: UserApi(token),
        notesApi: NotesApi ()
       
    }
    

    return(
        <GlobalState.Provider value = {state}>
            {children}
        </GlobalState.Provider>
    )
}