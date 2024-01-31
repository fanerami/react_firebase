import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();
  const deconnect = () => {
    localStorage.removeItem("user");
    navigate("/connexion");
  }

  return (
    <div>Home
      <button onClick={deconnect}>Déconnecter</button>
    </div>
  )
}

export default Home
