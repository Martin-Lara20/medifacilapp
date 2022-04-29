import firebase from "firebase";
import { firebaseApp } from "./firebase";
import { fileToBlob } from "./helpers";

const db = firebase.firestore(firebaseApp)

export const getCurrentUser = () =>{
    return firebase.auth().currentUser
}

export const uploadImage = async (image, path, name) => {
    const result = {statusResponse: false, error: null, url: null}
    const ref = firebase.storage().ref(path).child(name)
    const blob = await fileToBlob(image)

    try{
        await ref.put(blob)
        const url = await firebase.storage().ref(`${path}/${name}`).getDownloadURL()
        result.statusResponse = true
        result.url = url
    } catch(error){
        result.error = error
    }
    return result
}

export const addDocument = async (collection, data) => {
    const result = {statusResponse: true, error: null}
    try{
        await db.collection(collection).add(data)
    }catch(error){
        result.statusResponse = false
        result.error = error
    }
    return result
}