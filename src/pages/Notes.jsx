import React, { useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import {crudNotes} from '../hooks/crudNotes';
import { auth } from '../config/firebase';
import CardList from '../components/CardList';
import { useNavigate } from 'react-router-dom';

const Notes = () => {

    const {getUserNotes, getUserNotesSharedWith, deleteUserNotes} = crudNotes();


    const [userNotes, setUserNotes] = useState([]);
    const [userNotesSharedWith, setUserNotesSharedWith] = useState([]);

    const [activeTab, setActiveTab] = useState('myNotes');


    // const userConnected = auth.currentUser

    const navigate = useNavigate();



    const deleteNote = async (id) => {
        await deleteUserNotes(id);
    }

    useEffect(()=>{


        const getUserNotesAsync= async(uid) =>{

            setUserNotes(await getUserNotes(uid));
            setUserNotesSharedWith(await getUserNotesSharedWith(uid));
        }


        auth.onAuthStateChanged((user) => {
            if (user) {

              // console.log(user.auth.currentUser.uid);
              getUserNotesAsync(user.auth.currentUser.uid);
            }
          });
        // getUserNotesAsync();


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])





  return (
    <>
        <Navbar/>
        <div className="container mt-5">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'myNotes' ? 'active' : ''}`} onClick={() => setActiveTab('myNotes')}>
                        Mes Notes
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'sharedNotes' ? 'active' : ''}`} onClick={() => setActiveTab('sharedNotes')}>
                        Notes Partagées Avec Moi
                    </button>
                </li>
            </ul>
            <div className="tab-content mt-3">
                <div className={`tab-pane fade ${activeTab === 'myNotes' ? 'show active' : ''} h-100`} id="myNotes">
                    {userNotes && userNotes.length > 0 && (
                        <CardList notes={userNotes} deleteNote={deleteNote}/>
                    )}
                    {userNotes.length===0 && (<h3>Aucune Note</h3>)}



                    <button onClick={() => navigate("/notes/add")} className="btn btn-success btn-block">Ajouter une note</button>
                </div>
                <div className={`tab-pane fade ${activeTab === 'sharedNotes' ? 'show active' : ''}`} id="sharedNotes">
                    {userNotesSharedWith && userNotesSharedWith.length > 0 && (
                        <CardList notes={userNotesSharedWith} />
                    )}
                    {userNotesSharedWith.length===0 && (<h3>Aucune Note</h3>)}
                </div>
            </div>
        </div>
    </>

  )
}

export default Notes
