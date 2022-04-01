import React from "react";
import {StyleSheet, ScrollView, View, Text, Image} from 'react-native'
import { Divider, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native-elements'


export default function OptionRegister(){
    return(
        <ScrollView>
            <Image
                source={require('../../../assets/img/medifacil.png')}
                resizeMode = 'contain'
                style = {styles.logo}
            />
            <Text style = {styles.texOption}> 
                ¿Cómo desea registrarse?
            </Text>
            <Divider style={styles.divider}/>
            <OptionAccount/>
        </ScrollView>
    )
}

function OptionAccount(){
    const navigation = useNavigation()
    return(

        <View style = {styles.viewBtn}>
            <Button
                title = 'Usuario'
                buttonStyle ={styles.btnStyle}
                containerStyle = {styles.btnContainer}
                onPress = {()=> navigation.navigate('UserRegister')}
            >
            </Button>

            <Button
                title = 'Farmacia'
                buttonStyle ={styles.btnStyle}
                containerStyle = {styles.btnContainer}
                onPress = {()=> navigation.navigate('pharmacyRegister')}
            />
        </View>

    )
}


const styles = StyleSheet.create({
    logo:{
        width:'100%',
        height: 200,
        marginTop: 20,
    },
    texOption:{
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 20,
        textAlign: 'center' 
    },
    divider:{
        backgroundColor: '#00a680',
        margin: 40,
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
        height: 200,
        width: '80%'
    },
    btnContainer:{
        width: '40%'

    } 
})