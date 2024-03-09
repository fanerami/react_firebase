import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NoteForm from '../components/NoteForm'
import { useParams } from 'react-router-dom'
import { auth } from '../config/firebase'
import { crudNotes } from '../hooks/crudNotes'
import { crudUser } from '../hooks/crudUser'
import Footer from '../components/Footer'

const ModifyNote = () => {


    // value for the form
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [data, setData] = useState({
        "title": "",
        "content": "",
        "owner" : "",
        "sharedWith": []
    })

    // get note id from url
    const { id } = useParams();

    // fucction from hooks to get data from database
    const { updateNote, getNoteFromId } = crudNotes();
    const { getUsers } = crudUser();




    useEffect(()=>{


        const fetchData = async () => {
            auth.onAuthStateChanged(async (user) => {
                if (user) {

                    let usersResponse;
                    try {
                        // get lists of user for sharing except the owner
                        usersResponse = await getUsers(user.auth.currentUser.uid);
                        setUsers(usersResponse);
                    } catch (error) {
                        console.error(error);
                    }


                    try {

                        const result = await getNoteFromId(id);

                        const dataToSend = {
                            "title": result.title,
                            "content": result.content,
                            "owner" : result.owner,
                            "sharedWith": []
                        }

                        if ( typeof result.sharedWith !== 'undefined'){

                            const selectedUsers = usersResponse.filter(user => result.sharedWith.includes(user.id));

                            dataToSend["sharedWith"] = result.sharedWith;
                            setSelectedUsers(selectedUsers);
                        }

                        setData(dataToSend);




                    } catch (error) {
                        console.error(error);
                    }

                }
            });
        }


        fetchData();


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(data["title"] === ""){
        return <div>Loading...</div>;
    }
  return (
    <>
        <Navbar/>
        <NoteForm id={id} data={data} writeNote={updateNote} users={users} selectedUsers={selectedUsers}/>
        <Footer/>
    </>
  )
}

export default ModifyNote
