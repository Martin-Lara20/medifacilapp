import React, {useState, useEffect} from 'react'
import {View, Text} from 'react-native'
import firebase from 'firebase'
import UserGuest from './UserGuest'
import UserLogged from './UserLogged'
import Loading from '../../components/Loading'

export default function Account(){

    //login es la vaerable para efectuar la accion y set es la accion en lo que probocará
    const [login, setLongin] = useState(null)

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            console.log(user)
            !user ? setLongin(false) : setLongin(true)
            //? if 
            //: else
        })
    }, [])

    if(login === null) return <Loading isVisible = {true} text = 'Cargando...'/>

    return login ? <UserLogged/> : <UserGuest/>
}