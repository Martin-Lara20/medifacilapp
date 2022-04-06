import React from 'react'
import {StyleSheet, View, ScrollView, Text, Image} from 'react-native'
import {Divider, Button} from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function Login(){

    return(
        <ScrollView>
            <Image
                source={require('../../../assets/img/medifacil.png')}
                resizeMode = 'contain'
                style = {styles.logo}
            />

            <Text style = {styles.optionSesion}>
                Iniciar sesión como:
            </Text>

            <View style = {styles.viewContainer}>
                <OptionLogin/>
                <CreateAccount/>
            </View>

            <Divider style={styles.divider}/>
        </ScrollView>
    )
}

function CreateAccount(){
    const navigation = useNavigation()
    return(
        <Text style = {styles.textUserRegister}>
            ¿Aun no tienes cuenta?{' '}

            <Text style = {styles.linkUserRegister}
                onPress ={()=>navigation.navigate('option')}
            >
                Sign Up
            </Text>
        </Text>
    )
}

function OptionLogin(){
    const navigation = useNavigation()
    return(

        <View style = {styles.viewBtn}>            
            <Button
                title = 'Usuario'
                buttonStyle ={styles.btnStyle}
                containerStyle = {styles.btnContainer}
                onPress = {()=> navigation.navigate('userLogin')}
            >
            </Button>

            <Button
                title = 'Farmacia'
                buttonStyle ={styles.btnStyle}
                containerStyle = {styles.btnContainer}
                /* onPress = {()=> navigation.navigate('')} */
            />
        </View>        
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
    divider:{
        backgroundColor: '#05A6A6',
        margin: 40,
    },
    textUserRegister:{
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 20,
        textAlign: 'center' 
    },
    linkUserRegister:{
        color:'#05A6A6',
        fontWeight: 'bold'
    },
    optionSesion:{
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 20,
        textAlign: 'center'
    },
    viewBtn:{
        flex: 1,
        alignItems: 'center',
        marginLeft: '10%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    btnStyle:{
        backgroundColor: '#05A6A6',
        width: '80%'
    },
    btnContainer:{
        width: '40%'

    } 
})