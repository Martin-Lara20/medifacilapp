import React, {useRef} from "react"
import { StyleSheet, View, Text, Image} from 'react-native'
import UserRegisterForm from "../../../components/Account/UserRegisterForm"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from "react-native-toast-message"


export default function UserRegister(){
    const toastRef = useRef()
    return(
        <KeyboardAwareScrollView>
            <Image
                source={require('../../../../assets/img/medifacil.png')}
                resizeMode = 'contain'
                style = {styles.logo}
            />
            <View style ={styles.viewForm}>
                
                <UserRegisterForm toastRef={toastRef}/>
            </View>
            <Toast ref={toastRef}/>
        </KeyboardAwareScrollView>
    )

    
}

const styles = StyleSheet.create({
    viewForm:{
        marginRight: 40,
        marginLeft: 40 
    },
    logo:{
        width:'100%',
        height: 200,
        marginTop: 20
    }
})