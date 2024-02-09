import {db} from '../config/firebase';
import {collection, doc, setDoc, serverTimestamp} from 'firebase/firestore'


export const crudUser = () =>{

    const userCollectionRef = collection(db, "user");



    //addDoc(userCollectionRef, )

    const addUserDetails = async (uid, userDetails) =>{
        await setDoc(doc(userCollectionRef, uid),userDetails)
    }


    // const getUserDetails = async (uid) =>{
    //     await
    // }

    return {addUserDetails}
}
