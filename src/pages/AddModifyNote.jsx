import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { auth } from '../config/firebase';
import {crudNotes} from '../hooks/crudNotes';
import { useNavigate, useParams } from 'react-router-dom';
import { crudUser } from '../hooks/crudUser';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

// component used to add or modify note
const AddModifyNote = () => {


    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [sharedWith, setSharedWith] = useState([]);
    const [owner, setOwner] = useState("");
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // get id from the url. If id exists, it is a modification and it is an addition if not
    const { id } = useParams();

    const { addNote, getNoteFromId, updateUserNote } = crudNotes();
    const { getUsers } = crudUser();

    const navigate = useNavigate();

    const animatedComponents = makeAnimated();


    const handleForm = async (e) => {
        e.preventDefault();


        const data = {
            "title": title,
            "content": content,
            "owner" : owner, //auth.currentUser.uid,
            "sharedWith": selectedUsers.length >0 ? selectedUsers.map(user => user.value): [] //sharedWith
        }


        if(typeof id !== 'undefined'){
            updateUserNote(id, data).then(() => {
                navigate("/notes");
            })
        }else{
            addNote(data).then(()=>{
                navigate("/notes");
            })
        }

        // console.log(data);

    }


    useEffect(()=>{


        const fetchData = async () => {
            auth.onAuthStateChanged(async (user) => {
                if (user) {

                    setOwner(user.auth.currentUser.uid);
                    // Get note details to modify if id exists
                    if ( typeof id !== 'undefined' ) {
                        try {

                            const result = await getNoteFromId(id);

                            setContent(result.content);
                            setTitle(result.title);
                            setSharedWith(result.sharedWith);
                            setOwner(result.owner);


                        } catch (error) {
                            console.error(error);
                        }

                    }


                    // get lists of user for sharing except the owner

                    const users = await getUsers(user.auth.currentUser.uid);
                    setUsers(users);

                    // console.log(sharedWith);
                    // console.log(users);
                    const filterdUsers = users.filter(user => sharedWith.includes(user.value));

                    setSelectedUsers(filterdUsers);
                    setLoading(false);
                }
            });
        }


        fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    if (loading) {
        return <div>Loading...</div>;
    }
  return (
    <>
        <Navbar/>
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-body">
                    <form
                    onSubmit={handleForm}
                    className="signup-form">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Titre</label>
                            <input
                                type='title'
                                className="form-control"
                                value={title}
                                id="title"
                                onChange={(e) => setTitle(e.target.value)}
                                required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">Conteny</label>
                            <textarea
                                className="form-control"
                                id="content"
                                value={content}
                                rows="5"
                                onChange={(e) => setContent(e.target.value)}></textarea>
                        </div>
                        <div className="mb-3">
                            <Select
                                value={selectedUsers}
                                options={users}
                                closeMenuOnSelect={false}
                                isMulti
                                components={animatedComponents}
                                ></Select>
                        </div>
                        {typeof id === 'undefined' && (
                            <button type="submit" className="btn btn-success">Ajouter</button>
                        )}
                        {typeof id !== 'undefined' && (
                            <button type="submit" className="btn btn-success">Modifier</button>
                        )}
                        <button
                        onClick={() => {navigate("/notes")}}
                        className="btn btn-danger ms-2">Annuler</button>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default AddModifyNote
