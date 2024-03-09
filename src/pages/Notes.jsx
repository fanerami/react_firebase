import React, { useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import {crudNotes} from '../hooks/crudNotes';
import { auth } from '../config/firebase';
// import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import CardNotesList from '../components/CardNotesList';
import Footer from '../components/Footer';


const Notes = () => {

    const {getUserNotes, getUserNotesSharedWith, deleteUserNote} = crudNotes();


    const [user, setUser] = useState(null);
    const [userNotes, setUserNotes] = useState([]);
    const [userNotesSharedWith, setUserNotesSharedWith] = useState([]);
    const [loading, setLoading] = useState(true);
    // const navigate = useNavigate();



    const deleteNote = async (id) => {


        await deleteUserNote(id);

        setUserNotes(await getUserNotes(user.auth.currentUser.uid))

    }

    useEffect(()=>{


        const getUserNotesAsync=async(uid) =>{

            setUserNotesSharedWith(await getUserNotesSharedWith(uid));
            setUserNotes(await getUserNotes(uid));


            setLoading(false);


        }


        auth.onAuthStateChanged((user) => {
            if (user) {

                setUser(user);
                getUserNotesAsync(user.auth.currentUser.uid);
            }
        });




    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    if (loading) {
        return <div>Chargement en cours...</div>;
    }

  return (
    <>
        <Navbar/>
        <Container style={{ marginTop: '20px' }}>
            <CardNotesList myNotes={userNotes} notesSharedWithMe={userNotesSharedWith} deleteMethod={deleteNote}/>
        </Container>
        <Footer/>
    </>

  )
}

export default Notes
