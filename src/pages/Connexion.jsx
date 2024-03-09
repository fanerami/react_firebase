import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from '../config/firebase';
import { useNavigate, Link } from 'react-router-dom';

const Connexion = () => {





    const [email, setEmail] = useState("");
    const [mdp, setMdp] = useState("");
    const [validation, setValidation] = useState("");

    const navigate = useNavigate();

    const handleForm = async (e) => {
        e.preventDefault();
        try {
            const response = await signInWithEmailAndPassword(auth, email, mdp);
            setValidation("");


            console.log("connection");
            console.log(auth);

            localStorage.setItem("user", response.user.uid)
        } catch (error) {
            if(error.code === "auth/invalid-credential") {
                setValidation("Email ou mot de passe incorrecte")
            }
        }
    }


    useEffect( ()=>{

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
            <div className="position-fixed vh-100 vw-100 top-0" style={{color:"black"}}>
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
                                            Se Connecter
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



                                            <button type='submit' className="btn btn-primary">Se connecter</button>
                                        </form>

                                    </div>
                                    <div className="text-center mt-3">
                                        <p>Nouveau ici ? <Link to="/inscription">S'inscrire</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                </div>
            </div>


        </>
      )
}

export default Connexion
