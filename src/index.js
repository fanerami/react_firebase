import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Inscription from './pages/Inscription';
import Home from './pages/Home';
import Protected from './components/Protected';
import Connexion from './pages/Connexion';
import Notes from './pages/Notes';
import AddNote from './pages/AddNote';
import ModifyNote from './pages/ModifyNote';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>

      <Route path='inscription' element={<Inscription/>}/>
      <Route path='connexion' element={<Connexion/>}/>
      <Route path='/' element={<Protected/>} >
        <Route path='/' element={<Home/>} />
        <Route path='/notes' element={<Notes/>}/>
        <Route path='/notes/add' element={<AddNote/>}/>
        <Route path='/notes/modify/:id' element={<ModifyNote/>}/>
      </Route>
    </Route>
  )
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <RouterProvider router={router}/>
  </>
);

