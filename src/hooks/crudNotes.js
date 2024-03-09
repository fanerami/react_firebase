import {db} from '../config/firebase';
import {collection, query, where, getDocs, getDoc, doc, setDoc, deleteDoc} from 'firebase/firestore'

export const crudNotes = () =>{

    const notesCollectionRef = collection(db, "notes");




    const addNote = async (id, data) =>{
        await setDoc(doc(notesCollectionRef),data)

    }


    const getUserNotes = async (uid) =>{
        const q = query(notesCollectionRef, where("owner", "==", uid));

        const userDetails = await getDoc(doc(collection(db, "user"), uid));


        try {
            const querySnapshot = await getDocs(q);


            // const filteredNotes = querySnapshot.docs.map((doc) => ({
            //     ...doc.data(),
            //     id: doc.id,
            //     ...userDetails.data()
            // }));


            const filteredNotes = [];



            querySnapshot.forEach((note) => {

                filteredNotes.push({
                    ...note.data(),
                    id: note.id,
                    shared: false,
                    ...userDetails.data()
                })

            });



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

                // note.data() is never undefined for query doc snapshots
                try {
                    const userDetails = await getDoc(doc(collection(db, "user"), note.data().owner));


                    filteredNotes.push({
                        ...note.data(),
                        id: note.id,
                        shared: true,
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

    const getNoteFromId = async ( id ) => {

        try {
            const noteDetails = await getDoc(doc(notesCollectionRef, id));

            return noteDetails.data();
        } catch (error) {
            console.error(error);
            return null;
        }

    }

    const updateNote = async ( id, data ) => {
        await setDoc(doc(notesCollectionRef, id),data)
    }


    const deleteUserNote = async (uid) =>{

        await deleteDoc(doc(notesCollectionRef, uid))

    }




    return {addNote, getUserNotes, getUserNotesSharedWith, updateNote, deleteUserNote, getNoteFromId}
}
