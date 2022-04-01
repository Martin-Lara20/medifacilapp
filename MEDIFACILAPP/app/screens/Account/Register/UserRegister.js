import React from "react"
import { StyleSheet, View, Text, Image} from 'react-native'
import UserRegisterForm from "../../../components/Account/UserRegisterForm"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function UserRegister(){
    return(
        <KeyboardAwareScrollView>
            <Image
                source={require('../../../../assets/img/medifacil.png')}
                resizeMode = 'contain'
                style = {styles.logo}
            />
            <View style ={styles.viewForm}>
                
                <UserRegisterForm/>
            </View>
        </KeyboardAwareScrollView>
    )

    
}

const styles = StyleSheet.create({
    viewForms:{
        marginRight: 40,
        marginLeft: 40 
    },
    logo:{
        width:'100%',
        height: 200,
        marginTop: 20
    }
})