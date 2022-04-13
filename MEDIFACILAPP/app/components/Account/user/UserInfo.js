import React from "react"
import { StyleSheet, View, Text } from "react-native"
import {Avatar} from 'react-native-elements'
import firebase from 'firebase'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'



export default function UserInfo(props){
    const {userInfo} = props
    const {photoURL, displayName, email, toastRef} = userInfo
    console.log(photoURL)
    console.log(displayName)
    console.log(email)

    const changeAvatar= async ()=>{
        const resultPermissions = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
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
        <View style={styles.viewUserInfo}>
          <Avatar
           title=''
           rounded
           size='large'
           onPress={changeAvatar}
           containerStyle={styles.userInfoAvatar}
           source={
               photoURL ? {uri:photoURL} : require('../../../../assets/img/ImageProfile.png')
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
    viewUserInfo:{
        alignItems: 'center',
        justifyContent: 'center',
        //flexBasis: 'Row',//
        backgroundColor: '#f2f2f2',
        paddingTop: 10,
        paddingBottom: 30
    },
    userInfoAvatar:{
        marginTop:20,
        backgroundColor: '#D93425'
    },
    displayName:{
        fontWeight: 'bold',
        paddingBottom: 5,
        textAlign: 'center'
    }
})