import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { auth } from '../config/firebase';
import {crudNotes} from '../hooks/crudNotes';
import { useNavigate, useParams } from 'react-router-dom';

const AddNote = () => {


    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [sharedWith, setSharedWith] = useState([]);

    const [owner, setOwner] = useState(auth.currentUser.uid);

    const { id } = useParams();

    const {addNotes, getNoteFromId, updateUserNotes} = crudNotes();

    const navigate = useNavigate();


    const handleForm = async (e) => {
        e.preventDefault();

        const data = {
            "title": title,
            "content": content,
            "owner" : owner, //auth.currentUser.uid,
            "sharedWith": sharedWith
        }

        if(typeof id !== 'undefined'){
            updateUserNotes(id, data).then(() => {
                navigate("/notes");
            })
        }else{
            addNotes(data).then(()=>{
                navigate("/notes");
            })
        }

    }


    useEffect(()=>{

        if ( typeof id !== 'undefined' ) {
            auth.onAuthStateChanged(async (user) => {
                if (user) {

                    try {

                        const result = await getNoteFromId(id);

                        setContent(result.content);
                        setTitle(result.title);
                        setSharedWith(result.sharedWith);
                        setOwner(result.owner);

                        // console.log(result);

                    } catch (error) {
                        console.error(error);
                    }

                }
            });
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // console.log(id);

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

export default AddNote
