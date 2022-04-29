import firebase from "firebase";
import { fileToBlob } from "./helpers";

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