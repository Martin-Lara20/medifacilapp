import React, {useState} from "react";
import {StyleSheet, View} from 'react-native'
import {Input, Button, Icon} from 'react-native-elements'
import firebase from "firebase";
import { validateEmail } from "../../../utils/Validation";
import { assign, isEmpty } from "lodash";

export default function ChangeDisplayEmailUserForm(props){

    const{email, setShowModal, toastRef, setReloadUserInfo}= props
    const[newEmail, setNewEmail] = useState(email)
    const[password, setPassword] = useState(null)
    const[error, setError] = useState(null)
    const[errorPasword, setErrorPasword] = useState(null)
    const[showPassword, setShowPassword] = useState(false)
    const[isLoading, setIsLoading] = useState(false)

    const onSubmit =()=>{

        setError(null)
        setShowPassword(null)

        if(!newEmail){
            setError('El campo no puede estar vacio')
        }else if(!validateEmail(newEmail)){
            setError('Este correo no es válido')
            
        } else if(email === newEmail){
            setError('El email debe ser diferente al actual')
            
        } else {
            reauthenticate(password).then(()=>{
                if(isEmpty(password)){
                    setErrorPasword('Ingresa tu contraseña')
                    
                }else{
                    setIsLoading(true)
                    const update = newEmail
                    firebase.auth()
                    .currentUser.updateEmail(update)
                    .then(()=>{
                        toastRef.current.show({
                            type: 'success',
                            position: 'top',
                            text1: 'Empty',
                            text2: 'El email ha sido cambiado',
                            visibilityTime: 30000
                        });
                        console.log('Todo bien en firebase')
                        setIsLoading(false)
                        setReloadUserInfo(true)
                        setShowModal(false)
                    })
                    .catch(()=>{
                        console.log('Error al actualizar')
                        setIsLoading(false)
                    })
                } 
            })
            .catch((error)=>{
                setError(error.message)
            })
        }
    }



    return(
        <View style={styles.view}>
            <Input
                placeholder="Ingresar nuevo email..."
                containerStyle = {styles.input}
                rightIcon={{
                    type:'material-community',
                    name: 'at',
                    color: '#c2c2c2'
                    
                }}
                defaultValue={email || ''} 
                onChange={(e)=>setNewEmail(e.nativeEvent.text)}
                errorMessage={error}
                keyboardType="email-address"
            />
            <Input
                placeholder="'Ingresa tu contraseña'"
                containerStyle = {styles.input}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        iconStyle={styles.eyeIcon}
                        onPress={()=>setShowPassword(!showPassword)}
                    />
                }
                defaultValue={password || ''} 
                onChange={(e)=>setPassword(e.nativeEvent.text)}
                errorMessage={errorPasword}
                password={true}
                secureTextEntry={showPassword ? false : true}
            />            
            <Button
                title='Guardar Cambios'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>        
    )
}

export const reauthenticate = (password) => {
    var userInfo = firebase.auth().currentUser
    var credentials = firebase.auth.EmailAuthProvider.credential(userInfo.email, password)
    return userInfo.reauthenticateWithCredential((credentials))
}



const styles = StyleSheet.create({
    input:{
        marginBottom: 10
    },
    view:{
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    btnContainer:{
        marginTop:20,
        width: '95%'
    }
    ,
    btn:{
        backgroundColor: '#00a680'
    },
    eyeIcon:{
        color:"#c2c2c2"
    }

})