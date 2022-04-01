import React from "react";
import {StyleSheet, View, Text, Image} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import PharmacyRegisterForm from "../../../components/Account/PharmacyRegisterForm";

export default function PharmacyRegister(){
    return(
        <KeyboardAwareScrollView>
            <Image
                source={require('../../../../assets/img/medifacil.png')}
                resizeMode = 'contain'
                style = {styles.logo}
            />
            <View style ={styles.viewForm}>
                <PharmacyRegisterForm/>
            </View>
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