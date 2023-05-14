import React from 'react';
import { createHashRouter, Outlet, RouterProvider } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import Main from './Pages/Main/Main';
import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer';
import RegisterForm from './Pages/Register/Register';
import LoginForm from './Pages/Login/Login';
import Users from './Pages/Users/Users';
import Profile from './Pages/Profile/Profile';
import Edit from './Pages/ProfileEdit/Edit';

const App = (): JSX.Element => {
  const router = createHashRouter([
    {
      element: (
        <>
          <Nav />
          <div className="App">
            <Outlet />
          </div>
          <Footer />
          <NotificationContainer />
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
          element: <Profile isMine={true} />,
        },
        {
          path: '/profile/edit',
          element: <Edit />,
        },
        {
          path: '/users',
          element: <Users />,
        },
        {
          path: 'profile/:userId',
          element: <Profile isMine={false} />,
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
          path: '/search/:searchParams',
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
