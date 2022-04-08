/* import React from "react"
import { StyleSheet, View, Text } from "react-native"
import {Avatar} from 'react-native-elements'
import firebase from 'firebase'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'



export default function PharmacyInfo(props){
    const {pharmacyInfo} = props
    const {photoURL, displayName, email, toastRef} = pharmacyInfo
    console.log(photoURL)
    console.log(displayName)
    console.log(email)

    const changeAvatar= async ()=>{
        const resultPermissions = await Permissions.askAsync(Permissions.mediaLibrary)
        console.log(resultPermissions.permissions.mediaLibrary)
        const resultPermissionsCamera = resultPermissions.permissions.mediaLibrary.status

      if(resultPermissionsCamera === 'denied'){
           toastRef.current.show({
             type: 'info',
               position: 'top',
              text1: 'Permissions',
              text2: 'Es necesario aceptar los permisos de la galeria',
            visibilityTime:3000
            })
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing:true,
                aspect:[4,3]
            })
                console.log(result)
        }
    }

    return(
        <View style={styles.viewPharmInfo}>
          <Avatar
           title=''
           rounded
           size='xlarge'
           onPress={changeAvatar}
           containerStyle={styles.pharmInfoAvatar}
           source={
               photoURL ? {uri:photoURL} : require('../../../assets/img/kisspng-computer-icons-user-profile-clip-art-portable-netw-c-svg-png-icon-free-download-389-86-onlineweb-5c6f7efde29670.9426602115508108779281.png')
           }
          />
          <View>
              <Text style={styles.displayName}>
                    {displayName ? displayName : 'Invitado'}
              </Text>
              <Text>
                  {email ? email: 'Entrada por SSO'}
              </Text>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewPharmInfo:{
        alignItems: 'center',
        justifyContent: 'center',
        //flexBasis: 'Row',//
        backgroundColor: '#f2f2f2',
        paddingTop: 10,
        paddingBottom: 30
    },
    pharmInfoAvatar:{
        marginTop:20,
        backgroundColor: '#D93425'
    },
    displayName:{
        fontWeight: 'bold',
        paddingBottom: 5
    }
})// */