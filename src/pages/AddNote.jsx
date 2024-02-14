import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { auth } from '../config/firebase';
import {crudNotes} from '../hooks/crudNotes';
import { useNavigate } from 'react-router-dom';

const AddNote = () => {


    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const {addNotes} = crudNotes();

    const navigate = useNavigate();


    const handleForm = async (e) => {
        e.preventDefault();

        const data = {
            "title": title,
            "content": content,
            "owner" : auth.currentUser.uid,
            "sharedWith": []
        }

        addNotes(data).then(()=>{
            navigate("/notes");
        })

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
                                id="title"
                                onChange={(e) => setTitle(e.target.value)}
                                required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">Conteny</label>
                            <textarea
                                className="form-control"
                                id="content"
                                rows="5"
                                onChange={(e) => setContent(e.target.value)}></textarea>
                        </div>
                        <button type="submit" className="btn btn-success">Ajouter</button>
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
