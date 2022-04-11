import React, {useRef} from 'react'
import {StyleSheet, View, ScrollView, Text, Image} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from "react-native-toast-message"; 
import UserLoginForm from '../../../components/Account/user/UserLoginForm';

export default function UserLogin(){
     const toastRef = useRef() 
    return(
        <KeyboardAwareScrollView>
            <Image
                source={require('../../../../assets/img/medifacil.png')}
                resizeMode = 'contain'
                style = {styles.logo}
            />              

            <View style = {styles.viewContainer}>
                <UserLoginForm toastRef={toastRef}  />
            </View>
             <Toast ref={toastRef}/>
        </KeyboardAwareScrollView>        
    )
}

const styles = StyleSheet.create({

    logo:{
        width:'100%',
        height: 300,
        marginTop: 20,
    },
    viewContainer:{
        marginRight: 40,
        marginLeft: 40,

    },
})