import React from 'react'
import {StyleSheet, View, ScrollView, Text, Image} from 'react-native'
import {Divider} from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function Login(){

    return(
        <ScrollView>
            <Image
                source={require('../../../assets/img/medifacil.png')}
                resizeMode = 'contain'
                style = {styles.logo}
            />

            <View style = {styles.viewContainer}>
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

            <Text style = {styles.linkRegister}
                onPress ={()=>navigation.navigate('option')}

            >
                Sign Up
            </Text>
        </Text>
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
    }

})