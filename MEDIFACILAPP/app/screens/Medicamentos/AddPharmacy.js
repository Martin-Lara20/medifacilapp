import React, {useRef, useState, useEffect} from "react";
import {StyleSheet, Text, View} from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";

import firebase from 'firebase/app'

import Loading from "../../components/Loading";
import AddPharmacyForm from "../../components/Pharmacy/AddPharmacyForm";
import {useNavigation} from "@react-navigation/native"

export default function AddPharmacy(){

    const toastRef = useRef()
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    const [user, setUser] = useState(null)
    console.log(user)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) =>{
            setUser(userInfo)
        })
    }, [])

    return(
        <KeyboardAwareScrollView>
            <AddPharmacyForm 
                toastRef = {toastRef} 
                setLoading={setLoading}
                navigation = {navigation}
                user = {user}
            />
            <Loading isVisible = {loading} text = 'Añadiendo Farmacia'/>
            <Toast ref={toastRef} position='center' opacity={0.9}/>
        </KeyboardAwareScrollView>
    )
}

const style = StyleSheet.create({})