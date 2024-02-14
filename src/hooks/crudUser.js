import {db, storage} from '../config/firebase';
import {collection, doc, setDoc, getDoc} from 'firebase/firestore'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'


export const crudUser = () =>{

    const userCollectionRef = collection(db, "user");



    //addDoc(userCollectionRef, )

    const addUserDetails = async (uid, userDetails) =>{
        await setDoc(doc(userCollectionRef, uid),userDetails)
    }


    const getUserDetails = async (uid) =>{

        // console.log(uid)

        try {
            const userDetails = await getDoc(doc(userCollectionRef, uid));



            let profileUrl = "https://via.placeholder.com/150"

            try {
                const ImageURL = await getDownloadURL(ref(storage, `users/${uid}/profil`));
                profileUrl = ImageURL;

            } catch (error) {
                console.error(error);
            }

            if (userDetails.exists()) {
                return {...userDetails.data(), profileUrl};
            }

        } catch (error) {
            console.error(error);
        }

    }

    const uploadImageProfile = async(uid, fileUpload) => {
        try {
            const filesFolderRef = ref(storage, `users/${uid}/profil`);
            await uploadBytes(filesFolderRef, fileUpload);
        } catch (error) {
            console.error(error);
        }
    }

    return {addUserDetails, getUserDetails, uploadImageProfile}
}
