import React from 'react';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();

    const deconnect = () => {
        //localStorage.removeItem("user");
        signOut(auth).then(() => {
            navigate("/connexion")
        });
    }


  return (
    <nav className="navbar navbar-light bg-light px-4">
        <div className='navbar-brand'>

        </div>

        <div>
            <button
            onClick={() => {navigate("/notes")}}
            className="btn btn-primary">
                Notes
            </button>
            <button
            onClick={() => {navigate("/")}}
            className="btn btn-success ms-1">
                Mon profil
            </button>
            <button
            onClick={deconnect}
            className="btn btn-danger ms-2">
                Deconnexion
            </button>
        </div>
    </nav>
  )
}

export default Navbar
