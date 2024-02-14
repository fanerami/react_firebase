import React, { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword,signOut } from 'firebase/auth'
import { auth } from '../config/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { crudUser } from '../hooks/crudUser';



const Inscription = () => {


    const [email, setEmail] = useState("");
    const [mdp, setMdp] = useState("");
    const [repMdp, setRepMdp] = useState("");
    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [fileUpload, setFileUpload] = useState(null);
    const [validation, setValidation] = useState("");



    const navigate = useNavigate();
    const {addUserDetails, uploadImageProfile} = crudUser();

    const handleForm = async (e) => {
        e.preventDefault();

        if(mdp !== repMdp){
            setValidation("Confirmation de mot de passe incorrecte");
            return;
        }

        try {
            const response = await createUserWithEmailAndPassword(auth, email, mdp);
            setValidation("");



            //localStorage.setItem("user", JSON.stringify(response.user));

            const userDetails = {
                "name": name
            }

            if(firstName !==""){
                userDetails["firstName"] = firstName;
            }


            await addUserDetails(response.user.uid, userDetails);



            if(fileUpload){
                await uploadImageProfile(response.user.uid, fileUpload)
            }



            signOut(auth).then(() => {
                navigate("/connexion")
            });


            // navigate("/connexion");
        } catch (error) {
            if(error.code === "auth/email-already-in-use") {
                setValidation("email déjà utilisé")
            }
            //console.error(error);
        }


    }


    useEffect( ()=>{

        // const user = localStorage.getItem("user");
        // if(user){
        //     navigate("/");
        // }

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigate("/");
            }
          });
          return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <>
    <div className="position-fixed vh-100 vw-100 top-0">
        <div className="w-100 h-100 bg-dark bg-opacity-75">
        </div>

        <div
             className="position-absolute top-50 start-50 translate-middle"
             style={{ minWidth: "400px" }}>
                 <div className="modal position-static d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title ">
                                    S'inscrire
                                </h5>
                            </div>

                            <div className="modal-body">
                                <p className="text-danger mt-1 text-center"> {validation}</p>
                                <form
                                 onSubmit={handleForm}
                                 className="signup-form">
                                    <div className="mb-3">
                                        <label className='form-label' htmlFor="signupEmail">Email</label>

                                        <input
                                        type='email'
                                        name='email'
                                        className='form-control'
                                        id='signupEmail'
                                        onChange={(e) => setEmail(e.target.value)}
                                        required />


                                    </div>
                                    <div className="mb-3">

                                        <label className='form-label' htmlFor="signupMdp">Mot de passe</label>

                                        <input
                                        type='password'
                                        name='mdp'
                                        className='form-control'
                                        id='signupMdp'
                                        onChange={(e) => setMdp(e.target.value)}
                                        required />


                                    </div>

                                    <div className="mb-3">

                                        <label className='form-label' htmlFor="signupMdpRep">Répéter le mot de passe</label>

                                        <input
                                        type='password'
                                        name='mdpRep'
                                        className='form-control'
                                        id='signupMdpRep'
                                        onChange={(e) => setRepMdp(e.target.value)}
                                        required />


                                    </div>

                                    <div className="mb-3">

                                        <label className='form-label' htmlFor="signupName">Nom</label>

                                        <input
                                        type='text'
                                        name='name'
                                        className='form-control'
                                        id='signupName'
                                        onChange={(e) => setName(e.target.value)}
                                        required />


                                    </div>

                                    <div className="mb-3">

                                        <label className='form-label' htmlFor="signupFirstName">Prénom</label>

                                        <input
                                        type='text'
                                        name='firstname'
                                        className='form-control'
                                        id='signupFirstName'
                                        onChange={(e) => setFirstName(e.target.value)}
                                         />


                                    </div>

                                    <div className="mb-3">

                                        <label className='form-label' htmlFor='profilPhoto'>Photo de profil</label>

                                        <input
                                        type='file'
                                        className="form-control"
                                        id='profilPhoto'
                                        onChange={(e) => setFileUpload(e.target.files[0])}/>


                                    </div>

                                    <button type='submit' className="btn btn-primary">S'inscrire</button>
                                </form>

                            </div>
                            <div className="text-center mt-3">
                                <p>Déjà inscrit ? <Link to="/connexion">Se connecter</Link></p>
                            </div>
                        </div>
                    </div>
                 </div>

        </div>
    </div>
    </>
  )
}

export default Inscription
