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

export const getPharmacy = async (limitPharmacy) => {
    const result = {statusResponse: true, error: null, pharmacies: [], startPharmacy: null}
    try{
       const response = await db.collection("pharmacy").orderBy("createAt", "desc").limit(limitPharmacy).get()
       if(!response.docs.length > 0){
           result.startPharmacy = response.docs[response.docs.length - 1]
       }
       response.forEach((doc) =>{
           const pharmacy = doc.data()
           pharmacy.id = doc.id
           result.pharmacies.push(pharmacy)
       })
    }catch(error){
        result.statusResponse = false
        result.error = error
    }
    return result
}