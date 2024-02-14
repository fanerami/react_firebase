import React, { useState } from 'react'
import { storage } from '../config/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { crudUser } from '../hooks/crudUser';

const Test = () => {



    const [fileUpload, setFileUpload] = useState(null);

    const {uploadImageProfile} = crudUser();

    const handleForm = async (e) => {
        e.preventDefault();

        if(fileUpload){
          uploadImageProfile("1Z3REFQSDFQ", fileUpload)
      }
    }

  return (
    <div>
        <form
            onSubmit={handleForm}
            className="signup-form">

            <div className="mb-3">

            <label className='form-label' htmlFor='profilPhoto'>Photo de profil</label>

            <input
            type='file'
            class="form-control"
            id='profilPhoto'
            onChange={(e) => setFileUpload(e.target.files[0])}/>


            </div>

            <button type='submit' className="btn btn-primary">S'inscrire</button>
        </form>

    </div>
  )
}

export default Test
