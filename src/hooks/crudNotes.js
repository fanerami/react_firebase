import {db} from '../config/firebase';
import {collection, query, where, getDocs, getDoc, doc, setDoc, deleteDoc} from 'firebase/firestore'

export const crudNotes = () =>{

    const notesCollectionRef = collection(db, "notes");




    const addNotes = async (data) =>{
        await setDoc(doc(notesCollectionRef),data)

    }


    const getUserNotes = async (uid) =>{
        const q = query(notesCollectionRef, where("owner", "==", uid));



        try {
            const querySnapshot = await getDocs(q);


            const filteredNotes = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            return filteredNotes;

        } catch (error) {
            console.error(error);
        }

    }

    const getUserNotesSharedWith = async (uid) =>{
        const q = query(notesCollectionRef, where('sharedWith', "array-contains", uid));





        try {
            const querySnapshot = await getDocs(q);

            const filteredNotes = [];


            querySnapshot.forEach(async (note) => {
                // doc.data() is never undefined for query doc snapshots
                try {
                    const userDetails = await getDoc(doc(collection(db, "user"), note.data().owner));


                    filteredNotes.push({
                        ...note.data(),
                        id: note.id,
                        ...userDetails.data()
                    })
                } catch (error) {
                    console.error(error);
                }
              });



            return filteredNotes;

        } catch (error) {
            console.error(error);
        }


    }

    const updateUserNotes = async (uid) =>{



    }


    const deleteUserNotes = async (uid) =>{

        await deleteDoc(doc(notesCollectionRef, uid))

    }




    return {addNotes, getUserNotes, getUserNotesSharedWith, updateUserNotes, deleteUserNotes}
}
