import React, { useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { crudUser } from '../hooks/crudUser';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {


  const [userConnectedDetails, setUserConnectedDetails] = useState({"firstName":"" , "name":"", profileUrl:"https://via.placeholder.com/150"});


  const [userConnectedEmail, setUserConnectedEmail] = useState("");


  const {getUserDetails} = crudUser();


  useEffect(()=>{

    const getUserDetailsAsync = async(uid, email) =>{
      setUserConnectedEmail(email);
      setUserConnectedDetails(await getUserDetails(uid))
    }



    auth.onAuthStateChanged((user) => {
      if (user) {

        getUserDetailsAsync(user.auth.currentUser.uid, user.auth.currentUser.email);
      }
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  return (
    <>
      <Navbar/>
      <div className="vh-100 vw-100 top-0">
        <div className="w-100 h-100 bg-opacity-75">

          <div className="row ">
            <div className="col-md-6 offset-md-3">
              <div className="card">
                <div className="card-body text-center">
                  <img
                  src={userConnectedDetails.profileUrl}
                  alt="profil img"
                  className="rounded-circle mb-3 img-thumbnail"
                  style={{width: "150px", heigth : "150px"}} />
                  <h2 className="card-title">Profil Utilisateur</h2>
                  <hr />

                  {/* Informations utilisateur (à remplacer par des données réelles) */}
                  <div className="form-floating mb-3">
                    <label className="form-label fs-2 fw-bold">Prénom :</label>
                    <p className="form-control-plaintext fs-2">{userConnectedDetails.firstName}</p>
                  </div>
                  <hr />
                  <div className="form-floating mb-3">
                    <label className="form-label fs-2 fw-bold">Nom :</label>
                    <p className="form-control-plaintext fs-2">{userConnectedDetails.name}</p>
                  </div>
                  <hr />
                  <div className="form-floating mb-3">
                    <label className="form-label fs-2 fw-bold">Email :</label>
                    <p className="form-control-plaintext fs-2">{userConnectedEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Home
