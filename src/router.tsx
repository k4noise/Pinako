import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Main from './Pages/Main/Main';
import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer';
import RegisterForm from './Pages/Register/Register';
import LoginForm from './Pages/Login/Login';

const App = (): JSX.Element => {
  const router = createBrowserRouter([
    {
      element: (
        <>
          <Nav />
          <div className="App">
            <Outlet />
          </div>
          <Footer />
        </>
      ),
      children: [
        {
          path: '/',
          element: <Main />,
        },
        {
          path: '/login',
          element: <LoginForm />,
        },
        {
          path: '/register',
          element: <RegisterForm />,
        },
        {
          path: '/profile',
          element: (
            <div className="AppWrapper">
              <span>Профиль</span>
            </div>
          ),
        },
        {
          path: '/users',
          element: (
            <div className="AppWrapper">
              <span>Пользователи</span>
            </div>
          ),
        },
        {
          path: 'user/:userId',
          element: (
            <div className="AppWrapper">
              <span>Профиль пользователя</span>
            </div>
          ),
        },
        {
          path: '/about',
          element: (
            <div className="AppWrapper">
              <span>О нас</span>
            </div>
          ),
        },
        {
          path: '/search',
          element: (
            <div className="AppWrapper">
              <span>Поиск</span>
            </div>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
