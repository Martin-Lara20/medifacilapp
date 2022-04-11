import React, {useRef} from "react";
import {StyleSheet, View, Text, Image} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from "react-native-toast-message"

import PharmacyRegisterForm from "../../../components/Account/pharmacy/PharmacyRegisterForm";

export default function PharmacyRegister(){
    const toastRef = useRef()
    return(
        <KeyboardAwareScrollView>
            <Image
                source={require('../../../../assets/img/medifacil.png')}
                resizeMode = 'contain'
                style = {styles.logo}
            />
            <View style ={styles.viewForm}>
                <PharmacyRegisterForm toastRef={toastRef}/>
            </View>
            <Toast ref={toastRef}/>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    viewForm:{
        marginRight: 40,
        marginLeft: 40,
    },
    logo:{
        width:'100%',
        height: 200,
        marginTop: 20,
    },
})