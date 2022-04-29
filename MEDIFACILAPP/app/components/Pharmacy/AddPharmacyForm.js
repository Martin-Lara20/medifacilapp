import React, {useState, useEffect} from "react";
import {StyleSheet, Text, View, ScrollView, Alert, Dimensions } from 'react-native';
import {Avatar, Button, Input, Icon, Image} from "react-native-elements";
import CountryPicker from 'react-native-country-picker-modal'
import {filter, isEmpty, map, size} from 'lodash'
import firebase from 'firebase/app'
import {loadImageFromGallery} from '../../utils/helpers'
import { validateEmail } from "../../utils/Validation";
import uuid from 'random-uuid-v4'
import { uploadImage } from "../../utils/actions";

const widthScreen = Dimensions.get("window").width

export default function AddPharmacyForm(props){
    const {toastRef, setLoading, navigation, user} = props
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorName, setErrorName] = useState(null)
    const [errorDescription, setErrorDescription] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorAddress, setErrorAddress] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)
    const [imagesSelected, setImagesSelected] = useState([])

    const addFarmacia = async() =>{
        if (!validForm()) {
            return
        }

        setLoading(true)
        const response = await uploadImages()
        console.log(response)
        setLoading(false)
        console.log(formData)
        console.log("Ok todo bien")
        
    }
    
     const uploadImages = async() => {
        const imageUrl = []
        await Promise.all(
            map(imagesSelected, async(image) => {
                const response = await uploadImage(image, "farmacias", uuid())
                if (response.statusResponse) {
                    imageUrl.push(response.url)
                }
            })
        )
        return imageUrl
    } 

    const validForm = () => {
        clearError()
        let isValid = true

        if (isEmpty(formData.name)) {
            setErrorName("Debes ingresar el nombre de la farmacia")
            isValid = false
        }

        if (!validateEmail(formData.email)) {
            setErrorEmail("Debes ingresar un email valido para la farmacia")
            isValid = false
        }

        if (isEmpty(formData.address)) {
            setErrorAddress("Debes ingresar la dirección de la farmacia")
            isValid = false
        }

        if (size(formData.phone) < 10) {
            setErrorPhone("Debes ingresar un numero telefonico para la farmacia valido")
            isValid = false
        }

        if (isEmpty(formData.description)) {
            setErrorDescription("Debes ingresar una referencia de la ubicación")
            isValid = false
        }

        else if(size(imagesSelected) === 0){
            toastRef.current.show("Debes de agregar al menos una imagen", 3000)
            isValid = false
        }
        
        return isValid
    }

        const clearError = () => {
            setErrorDescription(null)
            setErrorEmail(null)
            setErrorPhone(null)
            setErrorName(null)
            setErrorAddress(null)
        }

    return(
        <ScrollView style = {styles.viewContainer}>
            <ImagePharmacy
                imageFarmacia={imagesSelected[0]}
            />
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
        </ScrollView>
    )
}

function ImagePharmacy({ imageFarmacia }) {
    return (
    <View style={styles.viewPhoto}>
        <Image
            style={{ width: widthScreen, height: 200}}
            source={
                imageFarmacia
                    ? { uri: imageFarmacia}
                    : require('../../../assets/img/sin-image.jpg')
            }
        />
    </View>
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
                    placeholder="Numero de la farmacia..."
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

 function UploadImage(props){
    const {toastRef, imagesSelected, setImagesSelected} = props
    const imageSelect = async() => {
    const response = await loadImageFromGallery([4, 3])
        if (!response.status){
            toastRef.current.show("No has seleccionado ninguna imagen", 3000)
            return
        }
        setImagesSelected([...imagesSelected, response.image])
    }
 
    const removeImage = (image) =>{
        Alert.alert(
            "Estas a punto de borrar esta imagen",
            "¿Deseas eliminar esta imagen?",
            [
                {
                    text: "No",
                    style: "Cancel"
                },
                {
                    text: "Sí",
                    onPress: () =>{
                        setImagesSelected(
                            filter(imagesSelected, (imageUrl) => imageUrl !== image)
                        )
                    }
                }
            ],
            {cancelable: false}
        )
    }

    return(
        <ScrollView
        horizontal
        style={styles.viewImages}
        >
            {
                size(imagesSelected) < 6 && (
                   <Icon
                type="material-community"
                name="camera"
                color="#7a7a7a"
                containerStyle={styles.containerIcon}
                onPress={imageSelect} 
                     />   
                )
            }
            {
                map (imagesSelected, (imageFarmacia, index) => (
                    <Avatar
                        key={index}
                        style={styles.miniatureStyle}
                        source={{uri: imageFarmacia }}
                        onPress={() => removeImage(imageFarmacia)}
                        
                    />
                ))
            }
        </ScrollView>
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
    },
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20
    }
})