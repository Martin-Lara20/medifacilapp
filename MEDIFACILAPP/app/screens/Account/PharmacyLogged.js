import React, {useState, useRef, useEffect} from 'react'
import {View, Text, StyleSheet } from 'react-native'
import firebase from 'firebase'
import Toast from 'react-native-toast-message'
import {Button} from 'react-native-elements'
import PharmacyInfo from '../../components/Account/PharmacyInfo'

export default function PharmacyLogged(){
    const [pharmacyInfo, setPharmacyInfo] = useState(null)
    const toastRef = useRef()
    useEffect(()=>{
        (async()=>{
            const user = await firebase.auth().
            currentUser
            setPharmacyInfo(user)
        })()
    }, [])
    return(
        <View style={styles.viewPharmInfo}>
            {pharmacyInfo&&<PharmacyInfo pharmacyInfo={pharmacyInfo} toastRef={toastRef}/>}
            <Text>
             Cuenta y opciones
            </Text>
            <Button 
                title= 'Cerrar sesion' 
                buttonStyle={styles.btnCloseSession}
                titleStyle={styles.btnCloseSessionText}
                onPress={()=>firebase.auth().signOut()}
            />
            <Toast ref= {toastRef}/>
        </View>
    )
}

const styles = StyleSheet.create({
   viewPharmInfo:{
       minHeight: '100%',
       backgroundColor: '#f2f2f2'
   },
   btnCloseSession:{
       marginTop: 30,
       borderRadius: 0,
       backgroundColor: '#00a680',
       borderTopWidth: 1,
       borderTopColor: '#e3e3e3',
       borderBottomWidth: 1,
       borderBottomColor: '#e3e3e3',
       paddingTop: 10,
       paddingBottom:10
   },
   btnCloseSessionText:{
     color:'#fff'
   }
})