import { size } from 'lodash'
import React from 'react'
import {FlatList, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native'
import { Image } from 'react-native-elements'

export default function ListPharmacy(props){
    const {pharmacies, navigation} = props
    return (
        <View>
            <FlatList
                data={pharmacies}
                keyExtractor = {(item, index) => index.toString() }
                renderItem={(pharmacy) => (
                    <Pharmacy pharmacy={pharmacy} navigation= {navigation}/>
                )}
            />
        </View>
    )
}

function Pharmacy ({pharmacy, navigation}) {
    const {id, images, name, address, description, phone, callingCode} = pharmacy.item
    const imagePharmacy = images[0]

    return (
        <TouchableOpacity>
            <View style={styles.viewPharmacy}>
                <View style={styles.viewPharmacyImage}>
                <Image
                    resizeMode='cover'
                    PlaceholderContent={<ActivityIndicator color='#fff'/>}
                    source={{uri: imagePharmacy}}
                    style={styles.imagePharmacy}
                />
            </View>
       
        <View>
                <Text style={styles.pharmacyTitle}>{name}</Text>
                <Text style={styles.pharmacyInformation}>{address}</Text>
                <Text style={styles.pharmacyInformation}>+{callingCode}-{phone}</Text>
                <Text style={styles.pharmacyDescription}>
                    {
                    size (description) > 0
                        ? `${description.substr (0, 60)}...`
                        : description
                    }
                    </Text>
            </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    viewPharmacy: {
        flexDirection: 'row',
        margin: 10
    },
    viewPharmacyImage:{
        marginRight: 15
    },
    imagePharmacy: {
        width: 90,
        height: 90
    },
    pharmacyTitle:{
        fontWeight: 'bold'
    },
    pharmacyInformation:{
        paddingTop: 2,
        color: "grey"
    },
    pharmacyDescription:{
        paddingTop: 2,
        color: "grey",
        width: "75%"
    }
})