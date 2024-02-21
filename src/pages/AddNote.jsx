import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import NoteForm from '../components/NoteForm';
import { crudNotes } from '../hooks/crudNotes';
import { crudUser } from '../hooks/crudUser';
import { auth } from '../config/firebase';

const AddNote = () => {


    // value for the form
    const [users, setUsers] = useState([]);
    const [owner, setOwner] = useState("");


    // fucction from hooks to get data from database
    const { addNote } = crudNotes();
    const { getUsers } = crudUser();

    // data to add to database
    const data = {
        "title": "",
        "content": "",
        "owner" : owner,
        "sharedWith": []
    }



    useEffect(()=>{


        const fetchData = async () => {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    try {
                        // get lists of user for sharing except the owner
                        const usersResponse = await getUsers(user.auth.currentUser.uid);
                        setUsers(usersResponse);
                        setOwner(user.auth.currentUser.uid);


                    } catch (error) {
                        console.error(error);
                    }
                }
            });
        }


        fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <>
        <Navbar/>
        <NoteForm id={null} data={data} writeNote={addNote} users={users} selectedUsers={[]}/>
    </>
  )
}

export default AddNote
