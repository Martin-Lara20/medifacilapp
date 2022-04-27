import React, {useState} from "react";
import {StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import CountryPicker from 'react-native-country-picker-modal'

export default function AddPharmacyForm(props){
    const {toastRef, setLoading, navigation} = props

    const addFarmacia = () =>{
        console.log("Ok todo bien")
    }

    return(
        <View style = {styles.viewContainer}>
            <FormAdd/>
            <Button
                title="Añadir Farmacia"
                onPress={addFarmacia}
                buttonStyle = {styles.btnAddFarmacia}
            />
        </View>
    )
}

function FormAdd(){
    const [country, setCountry] = useState("MX")
    const [callingCode, setCallingCode] = useState("52")
    const [phone, setPhone] = useState("")

    return(
        <View style= {styles.viewForm}>
            <Input
                placeholder="Nombre de la farmacia"
            />
            <Input
                placeholder="Dirección de la farmacia..."
            />
            <Input
                placeholder="Email de la farmacia"
                keyboardType="email-address"
            />
            <View style = {styles.phoneView}>
                <CountryPicker
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    containerStyle={styles.countryPicker}
                    countryCode={country}
                    onSelect ={(country) =>{
                        setCountry(country.cca2)
                        setCallingCode(country.callingCode[0])
                    }}
                />
                <Input
                    placeholder="WhatsApp de la farmacia..."
                    keyboardType="phone-pad"
                    containerStyle = {styles.inputPhone}
                />
                <Input
                    placeholder="Referencias de ubicación"
                    multiline
                    containerStyle = {styles.textArea}
                />
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    viewContainer: {
        height: "100%"
    },
    viewForm: {
        marginHorizontal: 10
    },
    textArea: {
        height: 100,
        width: "100%"
    },
    phoneView: {
        width: "80%"
    },
    inputPhone: {
        width: "80%"
    },
    btnAddFarmacia: {
        margin: 20,
        backgroundColor: "#05A6A6"
    }

})