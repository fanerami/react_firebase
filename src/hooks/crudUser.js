import {db, storage} from '../config/firebase';
import {collection, doc, setDoc, getDoc, getDocs} from 'firebase/firestore'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'


export const crudUser = () =>{

    const userCollectionRef = collection(db, "user");



    //addDoc(userCollectionRef, )

    const addUserDetails = async (uid, userDetails) =>{
        try {
            await setDoc(doc(userCollectionRef, uid),userDetails);
        } catch (error) {
            console.log(error);
        }

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

    // get list of other users
    const getUsers = async (uid) => {

        try {
            const querySnapshot = await getDocs(userCollectionRef);

            const userToShare = []
            querySnapshot.forEach((user) => {
                if(user.id !== uid){
                    // userToShare.push({"value": user.id, "label": user.data().firstName+" "+user.data().name})
                    userToShare.push({"id": user.id, "text": user.data().firstName+" "+user.data().name})
                }
            });

            return userToShare;
        } catch (error) {
            console.log(error);
        }




    }

    return {addUserDetails, getUserDetails, uploadImageProfile, getUsers}
}
