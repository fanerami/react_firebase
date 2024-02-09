import {db} from '../config/firebase';
import {collection, doc, setDoc, getDoc} from 'firebase/firestore'


export const crudUser = () =>{

    const userCollectionRef = collection(db, "user");



    //addDoc(userCollectionRef, )

    const addUserDetails = async (uid, userDetails) =>{
        await setDoc(doc(userCollectionRef, uid),userDetails)
    }


    const getUserDetails = async (uid) =>{

        try {
            const userDetails = await getDoc(doc(userCollectionRef, uid));

            if (userDetails.exists()) {
                return userDetails.data();
              }

        } catch (error) {
            console.error(error);
        }

    }

    return {addUserDetails, getUserDetails}
}
