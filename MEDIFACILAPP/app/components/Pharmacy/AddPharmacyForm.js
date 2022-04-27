import React, {useState} from "react";
import {StyleSheet, Text, View, ScrollView, Alert, ImagePickerIOS } from "react-native";
import {Avatar, Button, Input, Icon } from "react-native-elements";
import CountryPicker from 'react-native-country-picker-modal'
import {map, size} from 'lodash'

export default function AddPharmacyForm(props){
    const {toastRef, setLoading, navigation} = props
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorName, setErrorName] = useState(null)
    const [errorDescription, setErrorDescription] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorAddress, setErrorAddress] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)
    const [imagesSelected, setImagesSelected] = useState([])

    const addFarmacia = () =>{
        console.log(formData)
        console.log("Ok todo bien")
    }

    return(
        <View style = {styles.viewContainer}>
            <FormAdd
                formData={formData}
                setFormData={setFormData}
                errorName={errorName}
                errorDescription={errorDescription}
                errorEmail={errorEmail}
                errorAddress={errorAddress}
                errorPhone={errorPhone}
            />
            <UploadImage
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
            />
            <Button
                title="Añadir Farmacia"
                onPress={addFarmacia}
                buttonStyle = {styles.btnAddFarmacia}
            />
        </View>
    )
}

function UploadImage({ toastRef, imagesSelected, setImagesSelected }){
    return(
        <ScrollView
        horizontal
        style={styles.viewImages}
        >
            {
                size(imagesSelected) < 10 && (
                   <Icon
                type="material-community"
                name="camera"
                color="#7a7a7a"
                containerStyle={styles.containerIcon}
                     />   
                )
            }
            {
            map (imagesSelected, (imageFarmacia, index) => (
                <Avatar
                    key={index}
                    style={styles.miniatureStyle}
                    source={{uri: imageFarmacia }}
                />
            ))
           }
        </ScrollView>
    )
}

function FormAdd(props){
    const {formData, setFormData, errorName, errorDescription, errorEmail, errorAddress, errorPhone} = props
    const [country, setCountry] = useState("MX")
    const [callingCode, setCallingCode] = useState("52")
    const [phone, setPhone] = useState("")

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    return(
        <View style= {styles.viewForm}>
            <Input
                placeholder="Nombre de la farmacia"
                defaultValue={formData.name}
                onChange={(e)=> onChange(e, "name")}
                errorMessage={errorName}
            />
            <Input
                placeholder="Dirección de la farmacia..."
                defaultValue={formData.address}
                onChange={(e)=> onChange(e, "address")}
                errorMessage={errorAddress}
            />
            <Input
                placeholder="Email de la farmacia"
                keyboardType="email-address"
                defaultValue={formData.email}
                onChange={(e)=> onChange(e, "email")}
                errorMessage={errorEmail}
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
                        setFormData({
                            ...formData, 
                            "country": country.cca2, 
                            "callinCode":country.callingCode[0]
                        })                        
                    }}
                />
                <Input
                    placeholder="WhatsApp de la farmacia..."
                    keyboardType="phone-pad"
                    containerStyle = {styles.inputPhone}
                    defaultValue={formData.phone}
                    onChange={(e)=> onChange(e, "phone")}
                    errorMessage={errorPhone}
                />
                <Input
                    placeholder="Referencias de ubicación"
                    multiline
                    containerStyle = {styles.textArea}
                    defaultValue={formData.description}
                    onChange={(e)=> onChange(e, "description")}
                    errorMessage={errorDescription}
                />
            </View>

        </View>
    )

}

const defaultFormValues = () => {
    return {
        name: "",
        description: "",
        email: "",
        phone: "",
        address: "",
        country: "MX",
        callingCode: "52",
    }
}

/* export const loadImageFromGallery = async(array) => {
    const response= {status: false, image:null }
    const resultPermissions = await Permissions.askAsync (Permissions.CAMERA)
    if (resultPermissions.status === "denied"){
        Alert.alert("Debes de darle permiso para acceder a las imagenes del telefono.")
        return response
    }
    const result = await ImagePicker.launchImageLibraryAsync({

    })
}  */  

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
    },
    viewImages: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 30
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle:{
        width: 70,
        height: 70,
        marginRight: 10
    }
})