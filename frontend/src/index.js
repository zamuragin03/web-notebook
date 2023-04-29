import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import Footer from './components/Footer';
import Header from './components/Header';
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./components/Context/AuthContext";;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className="wrapper">
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <App />
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  </div>
);
