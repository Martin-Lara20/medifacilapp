import React, {useState} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {Input, Icon, Button} from 'react-native-elements'
import firebase from 'firebase'
import {useNavigation} from '@react-navigation/native'
import { validateEmail } from '../../utils/Validation'

export default function PharmacyLoginForm(props){
    const {toastRef} = (props) 
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())

    const navigation = useNavigation()

    const onSubmit = () =>{
        if(formData.email.length===0 || formData.password.length===0){
            toastRef.current.show({
               type: 'error',
               position: 'top',
               text1: 'Empty',
               text2: 'Todos los campos son requeridos',
               visibilityTime: 30000
           });
        } else if(!validateEmail(formData.email)){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Empty',
                text2: 'El email es incorrecto',
                visibilityTime: 30000
            });        
        }else{
            firebase
                .auth()
                .signInWithEmailAndPassword(formData.email, formData.password)
                .then(()=>{
                    navigation.navigate('pharmacyLogged')
                })
                .catch(()=>{
                    toastRef.current.show({
                        type: 'error',
                        position: 'top',
                        text1: 'Empty',
                        text2: 'Las credenciales no son correctas',
                        visibilityTime: 30000
                    }); 
                })
        }
    }

    const onChange = (e, type) => {

        setFormData({...formData,[type]: e.nativeEvent.text})
    }

    return(
        <View style={styles.formContainer}>
            <Input
                placeholder='Correo Electronico'
                containerStyle = {styles.inputForm}
                onChange = {(e) => onChange(e, 'email')}
                rightIcon = {<Icon 
                    type= 'material-community' 
                    name= 'at' 
                    iconStyle={styles.iconRight}/>
                }
            />
            <Input
                placeholder='Contraseña'
                containerStyle = {styles.inputForm}
                onChange = {(e) => onChange(e, 'password')}
                password= {true}
                secureTextEntry={showPassword ? false : true}
                rightIcon = {<Icon 
                    type= 'material-community' 
                    name= {showPassword ? 'eye-off-outline' : 'eye-outline'} 
                    iconStyle={styles.iconRight}
                    onPress = {()=> setShowPassword(!showPassword)}
                
                />}
            />
            <Button
                title='Iniciar Sesión'
                ContainerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress = {onSubmit}
            /> 
        </View>
    )
}

function defaultFormValues(){
    return{
        email: '',
        password: '',
    }
}

const styles = StyleSheet.create({
    formContainer:{
        marginTop: 30
    },
    inputForm:{
        width: '100%',
        marginTop: 20
    },
    btnContainerRegister:{
        marginTop: 20,
        width: '95%'
    },
    btnRegister:{
        backgroundColor: '#05A6A6'
    },
    iconRight:{
        color: '#C1C1C1'
    }
})