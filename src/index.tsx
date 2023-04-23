import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './Components/Main/Main';
import Nav from './Components/Nav/Nav';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import './media.css';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
  <React.StrictMode>
    <Nav />
    <Header />
    <Main />
    <Footer />
  </React.StrictMode>
);
