import React, {useState} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {Input, Icon, Button} from 'react-native-elements'
import firebase from 'firebase'
import {useNavigation} from '@react-navigation/native'
import { validateEmail } from '../../utils/Validation'


export default function PharmacyRegisterForm(props){
    const {toastRef} = (props) 
    const [showPassword, setShowPassword] = useState(false)
    const [showRepeatPassword, setShowRepeatPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())

    const navigation = useNavigation()

    const onSubmit = () => {
        if(formData.rfc.length===0||formData.email.length===0||formData.password.length===0||formData.repeatPassword.length===0){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Empty',
                text2: 'Todos los campos son requeridos',
                visibilityTime: 30000
            });
        } else if (formData.rfc.length < 13){
        console.log('El rfc debe tener 10 caracteres')
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Empty',
                text2: 'El RFC debe tener mínimo 13 caracteres',
                visibilityTime: 30000
            }); 
        } else if (!validateEmail(formData.email)){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Empty',
                text2: 'El email no es correcto',
                visibilityTime: 30000
            }); 
        } else if (formData.password !== formData.repeatPassword){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Empty',
                text2: 'Las contraseñas deben ser identicas',
                visibilityTime: 30000
            });
        } else if (formData.password.length < 6){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Empty',
                text2: 'El Password debe tener mínimo 6 caracteres',
                visibilityTime: 30000
            });
        } else{
            firebase.auth()
            .createUserWithEmailAndPassword(formData.email, formData.password)
            .then(() =>{
                navigation.navigate('pharmacyLogged')
            })
            .catch(()=>{
                toastRef.current.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Empty',
                    text2: 'Este correo ya está registrado',
                    visibilityTime: 30000
                });
            })
        }
    }

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text})
    }

    return(
        <View style={styles.formContainer}>
            <Input
            placeholder="RFC"
            containerStyle={styles.inputForm}
            onChange={(e)=>onChange(e, 'rfc')}
            rightIcon={<Icon type='material-community' name= 'text-box-outline' iconStyle={styles.iconRight}/>}
            />
            <Input
            placeholder="Correo electronico"
            containerStyle={styles.inputForm}
            onChange={(e)=>onChange(e, 'email')}
            rightIcon={<Icon type='material-community' name= 'at' iconStyle={styles.iconRight}/>}
            />
             <Input
            placeholder="Contraseña"
            containerStyle={styles.inputForm}
            password={true}
            secureTextEntry={showPassword ? false : true}
            onChange={(e)=>onChange(e, 'password')}
            rightIcon={<Icon 
                type='material-community' 
                name= {showPassword ? 'eye-off-outline' : 'eye-outline' }
                iconStyle={styles.iconRight}
                onPress={()=> setShowPassword(!showPassword)}
                />}
            />
             <Input
            placeholder="Repetir Contraseña"
            containerStyle={styles.inputForm}
            password={true}
            secureTextEntry={showRepeatPassword ? false : true}
            onChange={(e)=>onChange(e, 'repeatPassword')}
            rightIcon={<Icon 
                type='material-community' 
                name= {showRepeatPassword ? 'eye-off-outline' : 'eye-outline' }
                iconStyle={styles.iconRight}
                onPress={()=> setShowRepeatPassword(!showRepeatPassword)}
                />}
            />
            <Button
            title='Resgistrarse'
            containerStyle={styles.btnContainerRegister}
            buttonStyle={styles.btnRegister}
            onPress={onSubmit}
            />
        </View>
    )
}

function defaultFormValues(){
    return{
        rfc: '',
        email: '',
        password: '',
        repeatPassword: ''
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
    color:'#c1c1c1'
}
})