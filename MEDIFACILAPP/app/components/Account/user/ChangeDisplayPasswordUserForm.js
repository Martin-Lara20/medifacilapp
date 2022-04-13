import React, {useState} from "react";
import {StyleSheet, View} from 'react-native'
import {Input, Button, Icon} from 'react-native-elements'
import firebase from "firebase";
import {size } from "lodash";

export default function ChangeDisplayPasswordForm(props){
    const{setShowModal, toastRef}= props
    const[newPassword, setNewPassword] = useState(null)
    const[currentPassword, setCurrentPassword] = useState(null)
    const[confirmPassword, setConfirmPassword] = useState(null)
    const[errorNewPassword, setErrorNewPassword] = useState(null)
    const[errorCurrentPassword, setErrorCurrentPassword] = useState(null)
    const[errorConfirmPassword, setErrorConfirmPassword] = useState(null)
    const[showPassword, setShowPassword] = useState(false)
    const[isLoading, setIsLoading] = useState(false)

    const onSubmit = () =>{
        setErrorNewPassword(null)
        setErrorCurrentPassword(null)
        setErrorConfirmPassword(null)

        if(!currentPassword ){
            setErrorCurrentPassword('Este campo es requerido')
        } else
        
        if (size(newPassword) < 6){
            setErrorNewPassword('El Password debe tener mínimo 6 caracteres')
        } else
        
        if (size (confirmPassword) < 6){
            setErrorConfirmPassword('El Password debe tener mínimo 6 caracteres')
        } else 
        if (newPassword !== confirmPassword){
            setErrorNewPassword('Las contraseñas deben ser identicas')
            setErrorConfirmPassword('Las contraseñas deben ser identicas')
        } else
        if (newPassword === currentPassword){
            setErrorCurrentPassword('La contraseña es identica a la actual')
            setErrorNewPassword('La contraseña es identica a la actual')
            setErrorConfirmPassword('La contraseña es identica a la actual')
        }
        else{
            reauthenticate(currentPassword).then(()=>{
                
                    setIsLoading(true)
                    const update = newPassword
                    firebase.auth()
                    .currentUser.updatePassword(update)
                    .then(()=>{
                        toastRef.current.show({
                            type: 'success',
                            position: 'top',
                            text1: 'Empty',
                            text2: 'La contraseña ha sido cambiada exitosamente',
                            visibilityTime: 30000
                        });
                        console.log('Todo bien en firebase')
                        setIsLoading(false)
                        setShowModal(false)
                    })
                    .catch(()=>{
                        console.log('Error al actualizar')
                        setIsLoading(false)
                    })
                } 
            )
            .catch((error)=>{
                setError(error.message)
            })

        }
        

    }


    return (
        <View style={styles.view}>
            <Input
                placeholder='Ingresar Contraseña Actual'
                containerStyle = {styles.input}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        iconStyle={styles.eyeIcon}
                        onPress={()=>setShowPassword(!showPassword)}
                    />
                } 
                defaultValue={currentPassword || ''} 
                onChange={(e)=>setCurrentPassword(e.nativeEvent.text)}
                errorMessage={errorCurrentPassword}
                password={true}
                secureTextEntry={showPassword ? false : true}
            /> 
            <Input
                placeholder='Nueva Contraseña'
                containerStyle = {styles.input}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        iconStyle={styles.eyeIcon}
                        onPress={()=>setShowPassword(!showPassword)}
                    />
                }
                defaultValue={newPassword || ''} 
                onChange={(e)=>setNewPassword(e.nativeEvent.text)}
                errorMessage={errorNewPassword}
                password={true}
                secureTextEntry={showPassword ? false : true}
            />
            <Input
                placeholder='Confirmar contraseña'
                containerStyle = {styles.input}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        iconStyle={styles.eyeIcon}
                        onPress={()=>setShowPassword(!showPassword)}
                    />
                } 
                defaultValue={confirmPassword || ''} 
                onChange={(e)=>setConfirmPassword(e.nativeEvent.text)}
                errorMessage={errorConfirmPassword}
                password={true}
                secureTextEntry={showPassword ? false : true}
            /> 

            <Button
                title='Cambiar Contraseña'
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
        backgroundColor: '#05A6A6'
    }
})