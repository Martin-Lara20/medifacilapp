import React, {useState, useEffect, useCallback} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {Icon, Input} from 'react-native-elements'
import firebase from 'firebase/app'
import { size } from 'lodash'
import {useNavigation} from '@react-navigation/native'
import {useFocusEffect} from '@react-navigation/native'


import Loading from '../../components/Loading'
import { getPharmacy } from '../../utils/actions'
import ListPharmacy from '../../components/Pharmacy/ListPharmacy'


export default function Pharmacy(){
    
    const [user, setUser] = useState(null)
    const [startPharmacy, setStartPharmacy] = useState(null)
    const [pharmacies, setPharmacies] = useState([])
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()
    
    const limitPharmacy = 7
    console.log("pharmacy", pharmacies)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) =>{
            setUser(userInfo)
        })
    }, [])

    useFocusEffect(
        useCallback(async()=>{
            setLoading(true)
            const response = await getPharmacy(limitPharmacy)
            if(response.statusResponse){
                setStartPharmacy(response.startPharmacy)
                setPharmacies(response.pharmacies)
            }
            setLoading(false)
        },[])
    )

    if(user === null){
        return <Loading isVisble={true} text="Procesando"/>
    }


    return(
        <View style={styles.viewBody}>
            {
                size(pharmacies) > 0 ? (
                    <ListPharmacy 
                        pharmacies ={pharmacies}
                        navigation={navigation}
                    />
                ) : (
                    <View style={styles.notFoundView}>
                        <Text style={styles.notFoundText}>No hay farmacias que mostrar</Text>
                    </View>
                )
            }
            {user && (
            <Icon 
                reverse
                type='material-community'
                name='plus'
                color= '#05A6A6'
                containerStyle={styles.btnContainer}
                onPress ={() => navigation.navigate("add-pharmacy")}
                user ={user}
                
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
    },
    notFoundView:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    notFoundText:{
        fontSize: 18,
        fontWeight: "bold"
    }
})