import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {Icon, Input} from 'react-native-elements'
import {firebaseApp} from '../../utils/firebase'
import firebase from 'firebase/app'
import {useNavigation} from '@react-navigation/native'

import Loading from '../../components/Loading'


export default function Pharmacy(){
    const [user, setUser] = useState(null)
    const navigation = useNavigation()

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) =>{
            setUser(userInfo)
        })
    }, [])

    if(user === null) return <Loading isVisible = {true} text = 'Procesando'/>

    return(
        <View style={styles.viewBody}>
            <Text>Pharmacy</Text>
            {user && (
            <Icon 
                reverse
                type='material-community'
                name='plus'
                color= '#05A6A6'
                containerStyle={styles.btnContainer}
                onPress ={() => navigation.navigate("add-pharmacy")}
            />)}
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1,
        backgroundColor: '#fff'
    },
    btnContainer:{
        position: 'absolute',
        bottom: 10,
        right: 10,
        shadowColor: 'black',
        shadowOffset:{width: 2, height: 2},
        shadowOpacity: 0.5
    }
})