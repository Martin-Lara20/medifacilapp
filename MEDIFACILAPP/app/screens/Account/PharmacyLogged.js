import React from 'react'
import {View, Text, Button} from 'react-native'
import firebase from 'firebase'

export default function PharmacyLogged(){
    return (
        <View>
            <Text>
                PharmacyLogged
            </Text>
            <Button title='Cerrar Sesión' onPress={()=>firebase.auth().signOut()}/>
        </View>
    )
}