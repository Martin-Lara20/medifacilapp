/* import React from "react"
import { StyleSheet, View, Text } from "react-native"
import {Avatar} from 'react-native-elements'
import firebase from 'firebase'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'



export default function PharmacyInfo(props){
    const {pharmacyInfo: {uid, photoURL, displayName, email, toastRef}} = props


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
            if(result.cancelled){
                toastRef.current.show({
                    type: 'Info',
                    position: 'top',
                    text1: 'Cancelled',
                    text2: 'Selecciona una imagen',
                    visibilityTime: 30000
                });
            } else{
                uploadImage(result.uri).then(() =>{
                    console.log('Imagen dentro de firebase')
                    updatePhotoUrl()
                }).catch(() => {
                    toastRef.current.show({
                        type: 'Error',
                        position: 'top',
                        text1: 'Firebase Error',
                        text2: 'No se pudo actualizar el avatar',
                        visibilityTime: 30000
                    });
                })
            }
        }
    }

    const uploadImage = async (uri) => {
        console.log(uri)
        const response = await fetch(uri)
        console.log(JSON.stringify (response))
        const blob = await response.blob()
        console.log(JSON.stringify(blob))
        const ref = firebase.storage().ref().child(`logo/${uid}`)
        return ref.put(blob)
    }
    const updatePhotoUrl = () =>{
        firebase.storage().ref(`logo/${uid}`).getDownloadURL()
        .then(async(response)=>{
            console.log(response)
            const update = {photoURL : response}
            await firebase.auth().currentUser.updateProfile(update)
            console.log('Imagen actualizada')

        })
    }

    return(
        <View style={styles.viewPharmInfo}>
          <Avatar
           title=''
           rounded
           size='large'
           onPress={changeAvatar}
           containerStyle={styles.pharmInfoAvatar}
           source={
               photoURL ? {uri:photoURL} : require('../../../../assets/img/ImageProfile.png')
           }
          />
          <View>
              <Text style={styles.displayName}>
                    {displayName ? displayName : 'Farmacia'}
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
}) */